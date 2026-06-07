import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { AudioModule, useAudioRecorder } from 'expo-audio';
import { useStore } from '../store/useStore';
import { MaterialIcons } from '@expo/vector-icons';

export default function CaptureScreen({ onNext }: { onNext: () => void }) {
  const { processNewAudio, isProcessing } = useStore();
  const recorder = useAudioRecorder();
  const [isRecording, setIsRecording] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const startRecording = async () => {
    try {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (!permission.granted) {
        console.error('Recording permission not granted');
        return;
      }

      await recorder.prepareToRecordAsync({
        extension: '.m4a',
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
      });
      await recorder.startAsync();
      setIsRecording(true);
      
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true })
        ])
      ).start();

    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!isRecording) return;
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
    setIsRecording(false);
    
    try {
      const uri = await recorder.stopAsync();
      if (uri) {
        // Enforce 1000ms debounce implicitly using the processing flag
        await processNewAudio(uri);
      }
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.visualContainer}>
        <Animated.View style={[
          styles.micButton, 
          isRecording ? { transform: [{ scale: pulseAnim }], backgroundColor: '#b2cdb6' } : {}
        ]}>
          <Pressable
            onPressIn={startRecording}
            onPressOut={stopRecording}
            disabled={isProcessing}
            style={styles.pressableArea}
          >
            <MaterialIcons name="mic" size={48} color="#172e1f" />
          </Pressable>
        </Animated.View>
        <Text style={styles.hintText}>
          {isProcessing ? 'Processing...' : (isRecording ? 'Listening...' : 'Hold to Speak')}
        </Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Capture your thoughts.</Text>
        <Text style={styles.subtitle}>
          Hold the button to speak. Orynd's local AI organizes them instantly.
        </Text>
      </View>

      <Pressable style={styles.nextButton} onPress={onNext} disabled={isProcessing}>
        <Text style={styles.nextButtonText}>Next</Text>
        <MaterialIcons name="arrow-forward" size={20} color="#b2cdb6" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121412',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  visualContainer: {
    width: 250,
    height: 330,
    backgroundColor: '#1f201e',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(140, 146, 139, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 64,
    position: 'relative',
  },
  micButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#7d9782',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  pressableArea: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintText: {
    position: 'absolute',
    bottom: 48,
    color: 'rgba(194, 200, 193, 0.6)',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    fontSize: 32,
    color: '#b2cdb6',
    fontWeight: '500',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#c2c8c1',
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 28,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#343533',
    paddingVertical: 16,
    width: 280,
    borderRadius: 32,
    gap: 8,
  },
  nextButtonText: {
    color: '#b2cdb6',
    fontSize: 14,
    fontWeight: '500',
  },
});

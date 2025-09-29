"use client"
import { useState, useEffect, useCallback } from 'react';

const PROFILE_KEY = 'sense-oasis-sensory-profile';

interface SensoryProfile {
  text: string;
  preferences: any;
}

export function useSensoryProfile() {
  const [profile, setProfile] = useState<SensoryProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(PROFILE_KEY);
      if (item) {
        setProfile(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to read sensory profile from localStorage", error);
      setProfile(null);
    } finally {
        setLoading(false);
    }
  }, []);

  const saveProfile = useCallback((newProfile: SensoryProfile) => {
    try {
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
      setProfile(newProfile);
    } catch (error) {
      console.error("Failed to save sensory profile to localStorage", error);
    }
  }, []);

  const clearProfile = useCallback(() => {
    try {
        window.localStorage.removeItem(PROFILE_KEY);
        setProfile(null);
    } catch (error) {
        console.error("Failed to clear sensory profile from localStorage", error);
    }
  }, []);

  return { profile, saveProfile, clearProfile, loading };
}

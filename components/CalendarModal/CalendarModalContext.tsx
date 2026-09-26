'use client';

import React, { createContext, useContext, useState, useCallback } from "react";
import CalendarModal from "./CalendarModal";

export interface BookingSessionContext {
  serviceName?: string;
  price?: string;
}

interface CalendarModalContextType {
  isOpen: boolean;
  initialSession: BookingSessionContext | null;
  openCalendar: (session?: BookingSessionContext | React.SyntheticEvent) => void;
  closeCalendar: () => void;
}

const CalendarModalContext = createContext<CalendarModalContextType>({
  isOpen: false,
  initialSession: null,
  openCalendar: () => {},
  closeCalendar: () => {},
});

export function CalendarModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialSession, setInitialSession] = useState<BookingSessionContext | null>(null);

  const openCalendar = useCallback(
    (session?: BookingSessionContext | React.SyntheticEvent) => {
      if (session && "serviceName" in session) {
        setInitialSession(session);
      } else {
        setInitialSession(null);
      }
      setIsOpen(true);
    },
    []
  );

  const closeCalendar = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <CalendarModalContext.Provider
      value={{ isOpen, initialSession, openCalendar, closeCalendar }}
    >
      {children}
      <CalendarModal
        isOpen={isOpen}
        onClose={closeCalendar}
        initialSession={initialSession}
      />
    </CalendarModalContext.Provider>
  );
}

export function useCalendarModal() {
  const context = useContext(CalendarModalContext);
  if (!context) {
    throw new Error(
      "useCalendarModal must be used within a CalendarModalProvider"
    );
  }
  return context;
}

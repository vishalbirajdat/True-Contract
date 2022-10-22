import React, { useState, useEffect } from 'react';

const hasWindow = typeof window !== 'undefined';
const getWindowsWidth = hasWindow && window.innerWidth;
const initial = getWindowsWidth < 600 ? "sm" : "lg";

export default function useWindowDimensions() {
    return initial;
}
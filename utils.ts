/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

export const hapticFeedback = (intensity: 'light' | 'medium' | 'heavy' = 'light') => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        const pattern = intensity === 'heavy' ? [50] : intensity === 'medium' ? [20] : [10];
        window.navigator.vibrate(pattern);
    }
};

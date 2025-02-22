/*
 * Copyright (c) Mike Lischke. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export type IDictionary = Record<string, unknown>;

/**
 * A helper function to asynchronously wait for a specific time. The call allows to run other JS code
 * while waiting for the timeout.
 *
 * @param ms The duration in milliseconds to wait.
 *
 * @returns A promise to wait for.
 */
export const sleep = (ms: number): Promise<unknown> => {
    return new Promise((resolve) => {
        return setTimeout(resolve, ms);
    });
};

/**
 * Waits for a condition to become true.
 *
 * @param timeout The number of milliseconds to wait for the condition.
 * @param condition A function that checks if a condition has become true.
 *
 * @returns A promise that resolves to true, if the condition became true within the timeout range, otherwise false.
 */
export const waitFor = async (timeout: number, condition: () => boolean): Promise<boolean> => {
    while (!condition() && timeout > 0) {
        timeout -= 100;
        await sleep(100);
    }

    return timeout > 0 ? true : false;
};

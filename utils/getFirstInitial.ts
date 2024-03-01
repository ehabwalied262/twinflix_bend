    // A function that takes a username as a parameter and returns the first initial
    export function getFirstInitial(username: string): string {
        // Get the first character of the username and capitalize it
        let initial = username.charAt(0).toUpperCase();
        // Return the initial
        return initial;
    }
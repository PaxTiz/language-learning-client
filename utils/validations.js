export const requiredIfUpdate = update => value => {
    if (update && !value) return false
    return true
}
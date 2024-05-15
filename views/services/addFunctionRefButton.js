export const addFunctionRefButton = (component, direction) => {
    component.addEventListener('click', () => {
        location.href = direction;
    });
}

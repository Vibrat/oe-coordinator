export namespace ClassEvent {
    export function hasClass(container: HTMLElement, name: string): boolean {
        return container.classList.contains(name)
    }
}
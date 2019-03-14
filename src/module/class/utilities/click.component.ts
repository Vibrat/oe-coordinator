export namespace ClickEvent {
    export function findParentSelector(name: string, from: HTMLElement): HTMLElement {
        let parentElement = from.parentElement;
        while (true) {
            if (parentElement.classList.contains(name) || parentElement.nodeName == 'BODY') {
                return parentElement;
            } 

            parentElement = parentElement.parentElement;
        };
    }
}
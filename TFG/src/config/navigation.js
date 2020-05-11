export let currNavigation = undefined;

let listeners = [];

export function addListener(listener) {
	listeners.push(listener);
}

export function removeListener(listener) {
	let index = listeners.indexOf(listener);
	if (index > -1)
		listeners.splice(index, 1);
}

export const navigation = async () => {
	if (!currNavigation)
		currNavigation = 'default';
	return currNavigation;
}

export function setNavigation(navigation) {
	currNavigation = navigation;
	listeners.forEach((element) => element());
}

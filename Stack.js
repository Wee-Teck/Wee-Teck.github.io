// Creates a stack
export class Stack {
  constructor() {
    this.items = [];
  }

  // Adds a new item (or several items) to the top of the stack
  push(item) {
    this.items.push(item);
  }

  // Removes the top item from the stack
  // Returns the removed item
  pop() {
    if (this.items.length === 0) {
      return null;
    }
    return this.items.pop();
  }

  // Returns the top item from the stack
  // The stack is not modified (it does not remove the item; it only returns the element for information purposes)
  peek() {
    if (this.items.length === 0) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  // Returns true if the stack does not contain any elements, and false if the size of the stack is bigger than 0
  isEmpty() {
    return this.items.length === 0;
  }

  // Returns the number of elements that the stack contains. It is similar to the length property of an array.
  size() {
    return this.items.length;
  }
}
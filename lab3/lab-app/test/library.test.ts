import { expect } from 'chai';
import 'mocha';
import { Library } from '../src/library';

// Описуємо, що ми тестуємо
describe('Library Class', () => {

    // Тест для методу addItem
    it('should add an item to the library', () => {
        const library = new Library<{ id: number; name: string }>();
        const item = { id: 1, name: 'Test Item' };
        library.addItem(item);
        const allItems = library.getAllItems();

        // Перевіряємо, що в бібліотеці є 1 елемент і він саме той, що ми додали
        expect(allItems.length).to.equal(1);
        expect(allItems[0]).to.deep.equal(item);
    });

    // Тест для методу getItemById
    it('should get an item by its ID', () => {
        const library = new Library<{ id: number; name: string }>();
        const item1 = { id: 1, name: 'Item 1' };
        const item2 = { id: 2, name: 'Item 2' };
        library.addItem(item1);
        library.addItem(item2);

        const foundItem = library.getItemById(2);

        // Перевіряємо, що знайдений елемент - це item2
        expect(foundItem).to.not.be.undefined;
        expect(foundItem?.id).to.equal(2);
    });
});
import Entry from '../models/Entry';

export default class EntryServices {
  fetchAll() {
    this.datas = [
      {
        id: 1,
        title: 'My first day out',
        body: 'Lorem ipsum lorem ipsum',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'My Second Day out',
        body: 'Lorem Lorem Lorem',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return this.datas.map((data) => {
      const entry = new Entry();
      entry.id = data.id;
      entry.title = data.title;
      entry.body = data.body;
      entry.createdAt = data.createdAt;
      entry.updatedAt = data.updatedAt;
      return data;
    });
  }

  getAll() {
    return this.fetchAll();
  }

  get(id) {
    return this.fetchAll()[id - 1];
  }

  setEntry(data) {
    const allEntry = this.fetchAll();
    const newEntry = { id: allEntry.length + 1, ...data };
    allEntry.push(newEntry);

    return allEntry;
  }

  editEntry(id, data) {
    const entry = this.fetchAll()[id - 1];
    const newEntry = Object.assing(entry, data);

    return newEntry;
  }

  deleteEntry(id) {
    const allEntry = this.fetchAll();
    return allEntry.filter(entry => entry.id !== id);
  }
}

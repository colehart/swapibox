import * as API from './helper.js';

describe('API', () => {
  describe('getFilms', () => {
    let mockFilms;

    beforeEach(() => {
      mockFilms = {
        results: [
          {title: 'Star Wars 1',
            release_date: '1977-01-03',
            opening_crawl: 'This is opening crawl 1'},
          {title: 'Star Wars 2',
            release_date: '1978-04-05',
            opening_crawl: 'This is opening crawl 2'},
          {title: 'Star Wars 3',
            release_date: '1979-07-09',
            opening_crawl: 'This is opening crawl 3'}
        ]
      };

      window.fetch = jest.fn(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockFilms)
      }));
    });

    it('should call fetch with the correct url', async () => {
      const expected = 'https://swapi.co/api/films/'

      await API.getFilms()

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should return films if the status is ok', async () => {
      const expected = [
          {title: 'Star Wars 1',
            releaseDate: '1977',
            openingCrawl: 'This is opening crawl 1'},
          {title: 'Star Wars 2',
            releaseDate: '1978',
            openingCrawl: 'This is opening crawl 2'},
          {title: 'Star Wars 3',
            releaseDate: '1979',
            openingCrawl: 'This is opening crawl 3'}
        ]

      const result = await API.getFilms();

      expect(result).toEqual(expected);
    });

    it('should throw an error if the status is not ok', async () => {
      const expected = Error('Status was not ok');

      window.fetch = jest.fn(() => Promise.resolve({ ok: false }));

      await expect(API.getFilms()).rejects.toEqual(expected);
    });
  });
});
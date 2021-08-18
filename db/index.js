import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('biyuyapp_watchlist.db');

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS watchlist (
					id TEXT PRIMARY KEY NOT NULL
				);`,
				[],
				() => resolve(),
				(_, err) => reject(err)
			)
		})
	});

	return promise;
}

export const getWatchlist = () => {
	const promise = new Promise((resolve, reject) => {
	  db.transaction(tx => {
		tx.executeSql(
		  'SELECT * FROM watchlist;',
		  [],
		  (_, result) => resolve(result),
		  (_, err) => reject(err),
		);
	  });
	});
  
	return promise;
}

export const insertItemToWatchlist = id => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`INSERT INTO watchlist (id) VALUES (?);`,
				[ id ],
				(_, result) => resolve(result),
				(_, err) => reject(err)
			);
		});
	});

	return promise;
}

export const deleteItemFromWatchlist = id => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				'DELETE FROM watchlist WHERE id = ?;',
				[ id ],
				(_, result) => resolve(result),
		  		(_, err) => reject(err)
			);
		});
	});

	return promise;
}
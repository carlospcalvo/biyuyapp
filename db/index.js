import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Biyuyapp.db');

export const init = () => {
	return Promise.all([
		initWatchlist(),
		initRates(),
		initCryptos()
	]);
}

export const initWatchlist = () => {
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

export const initRates = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS rates (
					id TEXT PRIMARY KEY NOT NULL,
					timestamp TEXT NOT NULL,
					time TEXT NOT NULL,
					name TEXT NOT NULL,
					value REAL NOT NULL,
					prev_value REAL NOT NULL,
					currency TEXT NOT NULL
				);`,
				[],
				() => resolve(),
				(_, err) => reject(err)
			)
		})
	});

	return promise;
}

export const initCryptos = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS cryptos (
					id TEXT PRIMARY KEY NOT NULL,
					name TEXT NOT NULL,
					ticker TEXT NOT NULL,
					timestamp TEXT NOT NULL,
					time TEXT NOT NULL,
					value REAL NOT NULL,
					prev_value REAL NOT NULL,
					currency TEXT NOT NULL
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

export const getOfflineRates = () => {
	const promise = new Promise((resolve, reject) => {
	  db.transaction(tx => {
		tx.executeSql(
		  'SELECT * FROM rates;',
		  [],
		  (_, result) => resolve(result),
		  (_, err) => reject(err),
		);
	  });
	});
  
	return promise;
}

export const insertItemsToOfflineRates = rates => {
	return Promise.all(rates.map(rate => {
		return new Promise((resolve, reject) => {
			db.transaction(tx => {
				tx.executeSql(
					`INSERT OR REPLACE INTO rates 
					(id, timestamp, time, name, value, prev_value, currency) 
					VALUES (?, ?, ?, ?, ?, ?, ?);`,
					[ rate.id, rate.timestamp, rate.time, rate.name, rate.value, rate.prev_value, rate.currency ],
					(_, result) => resolve(result),
					(_, err) => reject(err)
				);
			});
		})
	}));
}

export const getOfflineCryptos = () => {
	const promise = new Promise((resolve, reject) => {
	  db.transaction(tx => {
		tx.executeSql(
		  'SELECT * FROM cryptos;',
		  [],
		  (_, result) => resolve(result),
		  (_, err) => reject(err),
		);
	  });
	});
  
	return promise;
}

export const insertItemsToOfflineCryptos = cryptos => {
	return Promise.all(cryptos.map(crypto => {
		return new Promise((resolve, reject) => {
			db.transaction(tx => {
				tx.executeSql(
					`INSERT OR REPLACE INTO cryptos 
					(id, name, ticker, timestamp, time, value, prev_value, currency) 
					VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
					[ crypto.id, crypto.name, crypto.ticker, crypto.timestamp, crypto.time, crypto.value, crypto.prev_value, crypto.currency ],
					(_, result) => resolve(result),
					(_, err) => reject(err)
				);
			});
		});
	}));
}
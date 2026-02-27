import { openDB, type IDBPDatabase } from 'idb';

let dbPromiseCache: Promise<IDBPDatabase> | null = null;

const getDB = () => {
  if (typeof window === 'undefined') {
    throw new Error('IndexedDB is not available on the server');
  }
  if (!dbPromiseCache) {
    dbPromiseCache = openDB('campaignDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('campaigns')) {
          db.createObjectStore('campaigns');
        }
      },
    });
  }
  return dbPromiseCache;
};

// Save Data
export const setCampaignData = async (data: any) => {
  const db = await getDB();
  await db.put('campaigns', data, 'currentCampaign');
};

// Get Data
export const getCampaignData = async () => {
  const db = await getDB();
  return (await db.get('campaigns', 'currentCampaign')) || {};
};

// Delete Data
export const clearCampaignData = async () => {
  const db = await getDB();
  await db.delete('campaigns', 'currentCampaign');
};

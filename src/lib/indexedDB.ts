import { openDB } from 'idb';

export const dbPromise = openDB('campaignDB', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('campaigns')) {
      db.createObjectStore('campaigns');
    }
  },
});

// Save Data
export const setCampaignData = async (data: any) => {
  const db = await dbPromise;
  await db.put('campaigns', data, 'currentCampaign');
};

// Get Data
export const getCampaignData = async () => {
  const db = await dbPromise;
  return (await db.get('campaigns', 'currentCampaign')) || {};
};

// Delete Data
export const clearCampaignData = async () => {
  const db = await dbPromise;
  await db.delete('campaigns', 'currentCampaign');
};

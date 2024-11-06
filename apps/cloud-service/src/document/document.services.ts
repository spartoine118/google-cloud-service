import { getDocumentProvider } from './adapters/document-provider.factory';
import { DoSomething } from './document.router';
import { Providers } from './enums';
import { DataModel } from './interfaces';

export type SomeType = DoSomething & Partial<DataModel>;

const someTypeKeys: (keyof SomeType)[] = ['date', 'id', 'no', 'type'];

export async function doSomething(data: SomeType): Promise<DataModel> {
  console.log(`Processing document with id: ${data.id}`);

  const missingAttributes = someTypeKeys.filter(
    (key) => !data[key as keyof SomeType]
  );

  // Get the typing here correctly
  const composedData = missingAttributes.reduce(async (prevVal, _, index) => {
    const key = missingAttributes[index];

    if (!data[key]) {
      const provider = getProviderByMissingAttribute(key);
      const externalClient = getDocumentProvider(provider);

      const missingData = await externalClient.getData(data.id);

      return { ...prevVal, ...missingData };
    }

    return prevVal;
  }, {});

  await saveData(composedData as DataModel);

  return composedData as DataModel;
}

export function getProviderByMissingAttribute(key: keyof DataModel): Providers {
  // Implement logic to decide which Provider we need to call for which data
  switch (key) {
    case 'date':
    case 'no':
    case 'type':
      return Providers.PROVIDER_1;
  }
  throw Error('Provider for missing attribute does not exist');
}

export async function saveData(_: DataModel): Promise<void> {
  // Here call an API or save to DB through repo.ts
  return;
}

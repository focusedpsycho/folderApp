import { FolderViewModule } from './folder-view.module';

describe('FolderViewModule', () => {
  let folderViewModule: FolderViewModule;

  beforeEach(() => {
    folderViewModule = new FolderViewModule();
  });

  it('should create an instance', () => {
    expect(folderViewModule).toBeTruthy();
  });
});

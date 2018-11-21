import { CustomRoutingModule } from './custom-routing.module';

describe('CustomRoutingModule', () => {
  let customRoutingModule: CustomRoutingModule;

  beforeEach(() => {
    customRoutingModule = new CustomRoutingModule();
  });

  it('should create an instance', () => {
    expect(customRoutingModule).toBeTruthy();
  });
});

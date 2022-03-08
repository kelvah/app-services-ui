import React from 'react';
import { FederatedModule } from '@app/components';
import { AppServicesLoading } from '@rhoas/app-services-ui-components';

const OpenBridgePage: React.FC = () => {
  return (
    <>
      {/*<p>this is ob page inside app-services-ui. loading federated module below</p>*/}
      <FederatedModule
        scope="openbridge"
        fallback={<AppServicesLoading />}
        module="./OpenBridgeOverview"
        render={(OpenBridgeOverview) => <OpenBridgeOverview />}
      />
    </>
  );
};

export default OpenBridgePage;

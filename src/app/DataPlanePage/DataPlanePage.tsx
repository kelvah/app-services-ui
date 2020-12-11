import React, {useContext} from 'react';
import {InsightsContext} from "@app/utils";
import {RouteComponentProps} from "react-router-dom";
import {ConfigContext} from "@app/Config/Config";
import {getKeyCloakToken} from "@app/utils/keycloakAuth";
import {FederatedModule} from "../../Components/FederatedModule";

type DataPlanePageParams = {
  id: string
}

export const DataPlanePage = ({match}: RouteComponentProps<DataPlanePageParams>) => {

  const insights = useContext(InsightsContext);

  const config = useContext(ConfigContext);

  // TODO useParams is not working?
  const pathname = window.location.pathname.endsWith("/") ? window.location.pathname : `${window.location.pathname}/`;
  const parts = pathname.split("/");
  const id = parts[parts.length - 2];

  return (
    <FederatedModule
      scope="strimziUi"
      module="./Panels/Topics.patternfly"
      render={(FederatedTopics) => <FederatedTopics
        getApiOpenshiftComToken={insights.chrome.auth.getToken}
        getToken={getKeyCloakToken}
        id={id}
        apiBasePath={config.dataPlane.uiServerBasePath}
      />}
    />
  );
}
import type { PeerId, Stream } from "@libp2p/interface";
import type { Multiaddr } from "@multiformats/multiaddr";

import { IConnectionManager } from "./connection_manager.js";
import type { IFilter } from "./filter.js";
import type { Libp2p } from "./libp2p.js";
import type { ILightPushSDK } from "./light_push.js";
import { Protocols } from "./protocols.js";
import type { IRelay } from "./relay.js";
import type { IStoreSDK } from "./store.js";

export interface Waku {
  libp2p: Libp2p;
  relay?: IRelay;
  store?: IStoreSDK;
  filter?: IFilter;
  lightPush?: ILightPushSDK;

  connectionManager: IConnectionManager;

  dial(peer: PeerId | Multiaddr, protocols?: Protocols[]): Promise<Stream>;

  start(): Promise<void>;

  stop(): Promise<void>;

  isStarted(): boolean;

  isConnected(): boolean;
}

export interface LightNode extends Waku {
  relay: undefined;
  store: IStoreSDK;
  filter: IFilter;
  lightPush: ILightPushSDK;
}

export interface RelayNode extends Waku {
  relay: IRelay;
  store: undefined;
  filter: undefined;
  lightPush: undefined;
}

export interface FullNode extends Waku {
  relay: IRelay;
  store: IStoreSDK;
  filter: IFilter;
  lightPush: ILightPushSDK;
}

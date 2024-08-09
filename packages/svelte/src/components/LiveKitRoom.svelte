<script lang="ts">
  import type {
  AudioCaptureOptions,
  RoomConnectOptions,
  RoomOptions,
  ScreenShareCaptureOptions,
  VideoCaptureOptions,
} from 'livekit-client';
import type { MediaDeviceFailure, Room } from 'livekit-client';

import { type FeatureFlags, LKFeatureContext, RoomContext } from '../context';
  import { createEventDispatcher } from 'svelte';
  /**
   * URL to the LiveKit server.
   * For example: `wss://<domain>.livekit.cloud`
   * To simplify the implementation, `undefined` is also accepted as an intermediate value, but only with a valid string url can the connection be established.
   */
  export let serverUrl: string | undefined;
  /**
   * A user specific access token for a client to authenticate to the room.
   * This token is necessary to establish a connection to the room.
   * To simplify the implementation, `undefined` is also accepted as an intermediate value, but only with a valid string token can the connection be established.
   *
   * @see https://docs.livekit.io/cloud/project-management/keys-and-tokens/#generating-access-tokens
   */
  export let token: string | undefined;
  /**
   * Publish audio immediately after connecting to your LiveKit room.
   * @defaultValue `false`
   * @see https://docs.livekit.io/client-sdk-js/interfaces/AudioCaptureOptions.html
   */
  export let audio: AudioCaptureOptions | boolean = false;
  /**
   * Publish video immediately after connecting to your LiveKit room.
   * @defaultValue `false`
   * @see https://docs.livekit.io/client-sdk-js/interfaces/VideoCaptureOptions.html
   */
  export let video: VideoCaptureOptions | boolean = false;
  /**
   * Publish screen share immediately after connecting to your LiveKit room.
   * @defaultValue `false`
   * @see https://docs.livekit.io/client-sdk-js/interfaces/ScreenShareCaptureOptions.html
   */
  export let screen: ScreenShareCaptureOptions | boolean = false;
  /**
   * If set to true a connection to LiveKit room is initiated.
   * @defaultValue `true`
   */
  export let connect: boolean = true;
  /**
   * Options for when creating a new room.
   * When you pass your own room instance to this component, these options have no effect.
   * Instead, set the options directly in the room instance.
   *
   * @see https://docs.livekit.io/client-sdk-js/interfaces/RoomOptions.html
   */
  export let options: RoomOptions | undefined;
  /**
   * Define options how to connect to the LiveKit server.
   *
   * @see https://docs.livekit.io/client-sdk-js/interfaces/RoomConnectOptions.html
   */
  export let connectOptions: RoomConnectOptions | undefined;
  
  const emit = createEventDispatcher<{
    connected: void;
    disconnected: void;
    error: Error;
    mediaDeviceFailure: MediaDeviceFailure;
    encryptionError: Error;
  }>()

  /**
   * Optional room instance.
   * By passing your own room instance you overwrite the `options` parameter,
   * make sure to set the options directly on the room instance itself.
   */
  export let room: Room | undefined;

  export let simulateParticipants: number | undefined;

  /**
   * @internal
   */
  export let featureFlags: FeatureFlags | undefined;


</script>


import * as React from 'react';
import { type FeatureFlags, LKFeatureContext, RoomContext } from '../context';
import { useLiveKitRoom } from '../hooks';

<div ref={ref} {...htmlProps}>
  {room && (
    <RoomContext.Provider value={room}>
      <LKFeatureContext.Provider value={props.featureFlags}>
        {props.children}
      </LKFeatureContext.Provider>
    </RoomContext.Provider>
  )}
</div>
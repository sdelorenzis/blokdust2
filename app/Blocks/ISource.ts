import {IBlock} from './IBlock';
import {IEffect} from './IEffect';
import {SoundcloudTrack} from '../UI/SoundcloudTrack';
import {Source} from './Source';
import {VoiceCreator as Voice} from './Interaction/VoiceObject';
import ObservableCollection = Fayde.Collections.ObservableCollection; //TODO: es6 module

export interface ISource extends IBlock {
    AttackScheduled: boolean;
    Connections: Fayde.Collections.ObservableCollection<IEffect>;
    Sources?: any[];
    Envelopes?: Tone.AmplitudeEnvelope[];
    AudioInput?: Tone.Signal;
    OutputGain?: Tone.Signal;
    Settings?: ToneSettings;
    WaveIndex: string[];
    PowerConnections: number;
    ParticlePowered: boolean;
    LaserPowered: boolean;
    UpdateCollision: boolean;
    Collisions: any[];
    CheckRange: number;
    SearchResults: SoundcloudTrack[];
    Searching: Boolean;
    ResultsPage: number;
    SearchString: string;
    Grains?: Tone.Player[];
    MaxDensity?: number;
    RecordedAudio?: any;
    LoopStartPosition?: number;
    LoopEndPosition?: number;
    ActiveVoices: Voice[];
    FreeVoices: Voice[];
    AddEffect(effect: IEffect): void;
    RemoveEffect(effect: IEffect): void;
    CreateSource(): any;
    CreateEnvelope(): Tone.AmplitudeEnvelope;
    ValidateEffects(): void;
    SetPitch(pitch: Tone.Frequency, sourceId?: number, rampTime?: Tone.Time): void;
    GetPitch(sourceId?: number): number;
    ResetPitch(): void;
    OctaveShift(octavesAmount: number): void;
    ScheduleAttack(): void;
    TriggerAttack(index?: number|string): void;
    TriggerRelease(index?: number|string, forceRelease?: boolean): void;
    TriggerAttackRelease(duration?: Tone.Time, time?: Tone.Time, velocity?: number): void;
    IsPowered(): boolean;
    Refresh(): void;
}
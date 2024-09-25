import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "audio", schema: "common" })
export class AudioRecord {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ default: true, name: "is_valid" })
  isValid!: boolean;

  @Column({ name: "url" })
  url!: string;

  @Column({ name: "codec" })
  codec!: number;

  @Column({ name: "user_id" })
  userId!: string;

  @CreateDateColumn({ type: "timestamp without time zone", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp without time zone", name: "updated_at" })
  updatedAt!: Date;
}


// located at flutter_sound_platform_interface.dart on flutter repo
enum AudioCodec {
  // this enum MUST be synchronized with fluttersound/AudioInterface.java
  // and ios/Classes/FlutterSoundPlugin.h

  // / This is the default codec. If used
  // / Flutter Sound will use the files extension to guess the codec.
  // / If the file extension doesn't match a known codec then
  // / Flutter Sound will throw an exception in which case you need
  // / pass one of the known codec.
  defaultCodec,

  // / AAC codec in an ADTS container
  aacADTS,

  // / OPUS in an OGG container
  opusOGG,

  // / Apple encapsulates its bits in its own special envelope
  // / .caf instead of a regular ogg/opus (.opus).
  // / This is completely stupid, this is Apple.
  opusCAF,

  // / For those who really insist about supporting MP3. Shame on you !
  mp3,

  // / VORBIS in an OGG container
  vorbisOGG,

  // / Linear 16 PCM, without envelope
  pcm16,

  // / Linear 16 PCM, which is a Wave file.
  pcm16WAV,

  // / Linear 16 PCM, which is a AIFF file
  pcm16AIFF,

  // / Linear 16 PCM, which is a CAF file
  pcm16CAF,

  // / FLAC
  flac,

  // / AAC in a MPEG4 container
  aacMP4,

  // / AMR-NB
  amrNB,

  // AMR-WB
  amrWB,

  // / Raw PCM Linear 8
  pcm8,

  // / Raw PCM with 32 bits Floating Points
  pcmFloat32,

  // / PCM with a WebM format
  pcmWebM,

  // / Opus with a WebM format
  opusWebM,

  // / Vorbis with a WebM format
  vorbisWebM,
}

type TAudioRequest = Pick<AudioRecord, "url" | "codec">;

export { AudioCodec, TAudioRequest };

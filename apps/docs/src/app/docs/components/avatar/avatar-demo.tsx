"use client";

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage , SectionLabel } from "@patchui/react";
import { ArrowCircleDown, CheckCircle, Clock } from "@phosphor-icons/react/dist/ssr";
// GitHub avatars: public, always available.
const gh = (u: string) => `https://github.com/${u}.png?size=200`;

const CORE = [
  { image: gh("torvalds"), letter: "LT", alt: "Linus" },
  { image: gh("mojombo"), letter: "TP", alt: "Tom" },
  { image: gh("defunkt"), letter: "CW", alt: "Chris" },
];

const EXTENDED = [
  ...CORE,
  { image: gh("pjhyett"), letter: "PJ", alt: "PJ" },
  { image: gh("wycats"), letter: "YK", alt: "Yehuda" },
  { image: gh("ezmobius"), letter: "EM", alt: "Ezra" },
];

export function AvatarDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-3">
        <SectionLabel>Sizes (enum)</SectionLabel>
        <div className="flex items-center gap-3">
          <Avatar size="xs"><AvatarImage src={gh("torvalds")} alt="Linus" /><AvatarFallback>LT</AvatarFallback></Avatar>
          <Avatar size="sm"><AvatarImage src={gh("mojombo")} alt="Tom" /><AvatarFallback>TP</AvatarFallback></Avatar>
          <Avatar size="md"><AvatarImage src={gh("defunkt")} alt="Chris" /><AvatarFallback>CW</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarImage src={gh("pjhyett")} alt="PJ" /><AvatarFallback>PJ</AvatarFallback></Avatar>
          <Avatar size="xl"><AvatarImage src={gh("wycats")} alt="Yehuda" /><AvatarFallback>YK</AvatarFallback></Avatar>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Sizes (numeric)</SectionLabel>
        <div className="flex items-center gap-3">
          <Avatar size={20}><AvatarImage src={gh("torvalds")} alt="Linus" /><AvatarFallback>LT</AvatarFallback></Avatar>
          <Avatar size={32}><AvatarImage src={gh("mojombo")} alt="Tom" /><AvatarFallback>TP</AvatarFallback></Avatar>
          <Avatar size={48}><AvatarImage src={gh("defunkt")} alt="Chris" /><AvatarFallback>CW</AvatarFallback></Avatar>
          <Avatar size={64}><AvatarImage src={gh("pjhyett")} alt="PJ" /><AvatarFallback>PJ</AvatarFallback></Avatar>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Shapes</SectionLabel>
        <div className="flex items-center gap-3">
          <Avatar shape="circle"><AvatarImage src={gh("torvalds")} alt="Linus" /><AvatarFallback>LT</AvatarFallback></Avatar>
          <Avatar shape="square"><AvatarImage src={gh("mojombo")} alt="Tom" /><AvatarFallback>TP</AvatarFallback></Avatar>
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Group (members array)</SectionLabel>
        <div className="flex items-center gap-6">
          <AvatarGroup members={CORE} size={32} />
          <AvatarGroup members={EXTENDED} limit={4} size={32} />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Overlap: auto scales with size</SectionLabel>
        <div className="flex items-center gap-6">
          <AvatarGroup members={CORE} overlap="auto" size={16} />
          <AvatarGroup members={CORE} overlap="auto" size={24} />
          <AvatarGroup members={CORE} overlap="auto" size={32} />
          <AvatarGroup members={CORE} overlap="auto" size={48} />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Fixed overlap</SectionLabel>
        <div className="flex items-center gap-4">
          <AvatarGroup members={CORE} overlap={10} size={24} />
          <AvatarGroup members={CORE} overlap={6} size={24} />
          <AvatarGroup members={CORE} overlap={0} size={24} />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Reverse stacking</SectionLabel>
        <div className="flex items-center gap-6">
          <AvatarGroup members={CORE} size={32} />
          <AvatarGroup members={CORE} reverse size={32} />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>With custom icon (status badge overlay)</SectionLabel>
        <div className="flex items-center gap-4">
          <Avatar
            placeholder
            size={40}
            icon={<ArrowCircleDown className="size-3" />}
          />
          <Avatar
            placeholder
            size={40}
            icon={<CheckCircle className="size-3" />}
          />
          <Avatar
            placeholder
            size={40}
            icon={<Clock className="size-3" />}
          />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Letter</SectionLabel>
        <div className="flex items-center gap-3">
          <Avatar letter="SL" placeholder size={32} />
          <Avatar letter="EK" placeholder size={32} />
          <Avatar letter="CK" placeholder size={32} />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Placeholder</SectionLabel>
        <div className="flex items-center gap-3">
          <Avatar placeholder size={32} />
          <Avatar placeholder size={48} />
          <Avatar placeholder size={90} />
        </div>
      </div>
    </div>
  );
}

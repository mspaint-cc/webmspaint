"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function TranslatedFAQTitle() {
  const { translations } = useLanguage();
  return <>{translations?.faq?.title || "FAQ"}</>;
}

export function TranslatedFAQIntro() {
  const { translations } = useLanguage();
  const t = translations;

  return (
    <p className="text-muted-foreground">
      {t?.faq?.fullFaq || "The full FAQ is in the"}{" "}
      <Link
        target="_blank"
        className="text-white-500 underline"
        href={"https://discord.gg/mspaint"}
      >
        {t?.faq?.discordServer || "Discord Server"}
      </Link>
    </p>
  );
}

export function TranslatedFAQAccordion({ gamesList }: { gamesList: string[] }) {
  const { translations } = useLanguage();
  const t = translations;

  const gamesText = gamesList.slice(0, -1).join(", ") + " and " + gamesList.slice(-1);

  return (
    <Accordion
      id="faq"
      type="single"
      collapsible
      className="max-w-[1000px] w-[50vw] max-md:w-[75vw]"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>{t?.faq?.q1?.question || "How do I get whitelisted?"}</AccordionTrigger>
        <AccordionContent>
          {t?.faq?.q1?.answer || "You can get whitelisted by purchasing a key from the"}{" "}
          <Link className="text-white-500 underline" href={"https://shop.mspaint.cc/"}>
            {t?.faq?.q1?.shop || "shop"}
          </Link>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          {t?.faq?.q2?.question || "Where can I report bugs and suggest features?"}
        </AccordionTrigger>
        <AccordionContent>
          {t?.faq?.q2?.answer || "You can report bugs and suggest features in the Discord server."}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>{t?.faq?.q3?.question || "Does this work on mobile?"}</AccordionTrigger>
        <AccordionContent>
          {t?.faq?.q3?.answer || "Yes. mspaint works on mobile."}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>
          {t?.faq?.q4?.question || "I can't close the GUI. How can I fix it?"}
        </AccordionTrigger>
        <AccordionContent>
          {t?.faq?.q4?.answer ||
            "Close out of the GUI by pressing the shift on the right side of your keyboard."}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>{t?.faq?.q5?.question || "What games are supported?"}</AccordionTrigger>
        <AccordionContent>
          {(t?.faq?.q5?.answer || "As of right now, {games} are supported.").replace(
            "{games}",
            gamesText
          )}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger>
          {t?.faq?.q6?.question || "How do I review the script?"}
        </AccordionTrigger>
        <AccordionContent>
          {t?.faq?.q6?.answer || "You can review the script by using the"}{" "}
          <span className="bg-blue-400/70 px-1 py-[0.5px] rounded-sm font-bold">
            {t?.faq?.q6?.command || "/review"}
          </span>{" "}
          {t?.faq?.q6?.commandText || "command in the discord server."}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

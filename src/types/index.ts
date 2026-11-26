export interface SvcItem {
  h: string;
  p: string;
  price?: string;
}

export interface SvcBentoItem {
  h: string;
  p: string;
}

export interface ProcStep {
  h: string;
  p: string;
  t: string;
}

export interface ProjItem {
  tag: string;
  h: string;
  p: string;
  link: string;
  href: string | null;
  image?: string;
  url?: string;
  badge?: string;
}

export interface WhyCard {
  label: string;
  h: string;
  p: string;
}

export interface PosRow {
  key: string;
  val: string;
  highlight?: boolean;
}

export interface ProofItem {
  num: string;
  unit: string;
  label: string;
}

export interface WorkCard {
  tag: string;
  h: string;
  p: string;
  pills: string[];
  link: string | null;
  href?: string;
  image?: string;
  url?: string;
  badge?: string;
}

export interface CmpRow {
  criteria: string;
  agency: string;
  freelancer: string;
  Artcllick: string;
}

export interface ModalOpts {
  contact: boolean;
  services: boolean;
  process: boolean;
  projects: boolean;
}

export type Lang = "en";

export interface I18nData {
  nav_services: string;
  nav_projects: string;
  nav_process: string;
  nav_why?: string;
  nav_cta: string;
  status: string;
  h1: string;
  hero_p: string;
  cta_start: string;
  cta_projects: string;
  stat_label: string;
  stat_delta: string;
  for_who: string[];
  proof_items: ProofItem[];
  urgency: string;
  lang_toggle: string;
  // positioning
  pos_tag: string;
  pos_h2: string;
  pos_sub: string;
  pos_rows: PosRow[];
  // services
  tag_services: string;
  svc_bento_h2: string;
  svc_bento_p: string;
  svc_bento: SvcBentoItem[];
  // why
  why_tag: string;
  why_h2: string;
  why_p: string;
  why_cards: WhyCard[];
  // compare
  cmp_tag: string;
  cmp_h2: string;
  cmp_p: string;
  cmp_headers: string[];
  cmp_rows: string[][];
  // manifesto
  mani_tag: string;
  mani_quote: string;
  mani_p1: string;
  mani_p2: string;
  mani_p3: string;
  mani_p4: string;
  mani_founder: string;
  mani_role: string;
  // projects
  tag_projects: string;
  h2_projects: string;
  work_tag: string;
  work_h2: string;
  work_counter: string;
  work_cards: WorkCard[];
  // process
  tag_process: string;
  h2_process: string;
  proc_sub: string;
  proc_steps_ext: ProcStep[];
  // cta
  tag_cta: string;
  h2_cta: string;
  cta_p: string;
  cta_btn: string;
  // footer
  footer_copy: string;
  footer_tagline: string;
  footer_contact_title: string;
  footer_links_title: string;
  footer_links: { label: string; tab: string }[];
  footer_social_title: string;
  footer_available: string;
  footer_legal: string;
  footer_location: string;
  // contact modal
  modal_tag: string;
  modal_h3: string;
  modal_sub: string;
  modal_name: string;
  modal_name_ph: string;
  modal_email_ph: string;
  modal_type: string;
  modal_opts: string[];
  modal_msg: string;
  modal_msg_ph: string;
  modal_submit: string;
  modal_note: string;
  modal_ok_h3: string;
  modal_ok_p: string;
  quote_step1: string;
  quote_step2: string;
  quote_phone: string;
  quote_phone_ph: string;
  quote_company: string;
  quote_company_ph: string;
  quote_budget: string;
  quote_budget_opts: string[];
  quote_timeline: string;
  quote_timeline_opts: string[];
  quote_content: string;
  quote_content_opts: string[];
  quote_next: string;
  quote_back: string;
  // services modal
  svc_tag: string;
  svc_h3: string;
  svc_sub: string;
  svc_items: SvcItem[];
  svc_cta: string;
  // process modal
  proc_tag: string;
  proc_h3: string;
  proc_modal_sub: string;
  proc_steps: ProcStep[];
  proc_cta: string;
  // projects carousel
  proj_tag: string;
  proj_h3: string;
  proj_items: ProjItem[];
}

// Bewusst enge Zuordnung: Eine Screeningbeobachtung bewertet nur die hier
// ausdrücklich genannten Einzelkompetenzen, niemals automatisch den gesamten
// Unterbereich. Generische Situationsvergleiche (V6) liefern Kontext, aber keine
// automatische Kompetenzbewertung.
export const COMPETENCY_LINKS = {
  "B3:1": ["learning_orientierung_kennt_ablaeufe_des_schultages"],
  "B3:2": ["learning_orientierung_findet_benoetigte_arbeitsmittel", "learning_organisation_haelt_ordnung_am_arbeitsplatz"],
  "B3:3": ["learning_aufgabenbeginn_beginnt_aufgaben_nach_aufforderung"],
  "B3:4": ["learning_ausdauer_bleibt_bei_einer_aufgabe", "learning_ausdauer_arbeitet_ueber_eine_kurze_zeit_konzentriert", "cognition_aufmerksamkeit_bleibt_bei_einer_aufgabe"],
  "B3:5": [],

  "B4:1": ["speech_verstehen_muendliche_auftraege_werden_noch_nicht_sicher_"],
  "B4:2": ["speech_kommunikation_rueckfragen_werden_noch_nicht_sicher_gestellt", "emotional_selbstwahrnehmung_aeussert_eigene_beduerfnisse_angemessen"],
  "B4:3": ["emotional_selbstwahrnehmung_aeussert_eigene_beduerfnisse_angemessen"],
  "B4:4": ["emotional_kontakt_nimmt_kontakt_zu_anderen_kindern_auf"],
  "B4:5": ["speech_kommunikation_gespraechsregeln_werden_noch_nicht_sicher_eing", "emotional_selbstkontrolle_haelt_klassenregeln_ein"],

  "S1:1": ["speech_artikulation_einzelne_laute_werden_noch_nicht_sicher_gebild"],
  "S1:2": ["speech_artikulation_laute_oder_silben_werden_teilweise_ausgelassen"],
  "S1:3": ["speech_artikulation_aeusserungen_sind_nicht_immer_verstaendlich"],
  "S1:4": ["speech_stimme_lautstaerke_ist_noch_nicht_situationspassend"],
  "S1:5": ["speech_stimme_sprechtempo_und_verstaendlichkeit_sind_noch_ni"],
  "S1:6": ["speech_stimme_betonung_ist_noch_nicht_passend"],
  "S1:7": ["speech_redefluss_passende_woerter_werden_noch_nicht_rechtzeitig"],
  "S1:8": ["speech_redefluss_pausen_und_satzabbrueche_treten_noch_auf"],
  "S1:9": ["speech_redefluss_gedanken_werden_beim_sprechen_noch_nicht_siche"],

  "W1:1": ["perception_raeumliche_beziehungen_geforderte_stellen_im_heft_buch_oder_auf_dem_a", "perception_raeumliche_beziehungen_die_orientierung_auf_einer_arbeitsseite_geling"],
  "W1:2": ["perception_figur_grund_wichtige_elemente_werden_in_unruhigen_bildern_", "perception_figur_grund_gesuchte_informationen_werden_auf_arbeitsblaet"],
  "W1:3": ["perception_konstanz_aehnliche_formen_oder_zeichen_werden_noch_haeu", "perception_raum_lage_aehnlich_aussehende_buchstaben_oder_zahlen_wer"],
  "W1:4": ["perception_raeumliche_beziehungen_punktebilder_werden_noch_nicht_sicher_uebertra"],
  "W1:5": ["cognition_aufmerksamkeit_bleibt_bei_einer_aufgabe"],

  "W2:1": ["perception_konstanz_gleiche_merkmale_werden_in_unterschiedlichen_d"],
  "W2:2": ["perception_konstanz_aehnliche_formen_oder_zeichen_werden_noch_haeu", "perception_raum_lage_gedrehte_oder_veraenderte_formen_werden_noch_u"],
  "W2:3": ["perception_figur_grund_wichtige_elemente_werden_in_unruhigen_bildern_", "perception_figur_grund_in_visuell_unruhigem_material_geht_die_orienti"],
  "W2:4": ["perception_raum_lage_rechts_und_links_werden_noch_nicht_durchgaengi", "perception_raum_lage_raum_lage_begriffe_werden_noch_nicht_zuverlaes", "perception_raeumliche_beziehungen_einfache_raeumliche_beziehungen_auf_bildern_we"],
  "W2:5": ["cognition_gedaechtnis_merkt_sich_einfache_reihenfolgen"],
  "W2:6": ["math_praenumerisch_setzt_muster_fort", "math_praenumerisch_uebertraegt_muster", "cognition_denken_wendet_bekanntes_auf_neue_aufgaben_an"],

  "W3:1": ["perception_auditive_differenzierung_verschiedene_geraeusche_werden_noch_nicht_sich"],
  "W3:2": ["perception_auditive_differenzierung_aehnlich_klingende_laute_werden_noch_haeufig_v", "speech_phonologie_aehnlich_klingende_laute_werden_noch_verwechse"],
  "W3:3": ["perception_auditive_identifikation_reimwoerter_werden_noch_nicht_sicher_erkannt", "perception_auditive_identifikation_woerter_mit_gleichem_anlaut_werden_noch_nicht_", "german_phonologie_erkennt_reime"],
  "W3:4": ["perception_auditive_gliederung_woerter_werden_noch_nicht_zuverlaessig_in_silb", "perception_auditive_gliederung_woerter_werden_mit_unterstuetzung_in_einzelne_", "german_phonologie_gliedert_woerter_in_silben"],
  "W3:5": ["perception_auditives_gedaechtnis_einfache_rhythmen_werden_noch_nicht_sicher_nac", "cognition_gedaechtnis_merkt_sich_einfache_reihenfolgen"],
  "W3:6": ["perception_auditives_gedaechtnis_bei_mehrteiligen_muendlichen_auftraegen_gehen_", "speech_verstehen_mehrteilige_auftraege_muessen_gegliedert_werde"],

  "W4:1": ["motor_grobmotorik_bewegt_sich_sicher_im_raum", "motor_grobmotorik_stoppt_bewegung_auf_signal"],
  "W4:2": ["motor_grobmotorik_haelt_gleichgewicht", "perception_vestibulaer_das_gleichgewicht_wird_in_einfachen_bewegungss", "perception_vestibulaer_kurzzeitiges_stehen_auf_einem_bein_gelingt_noc"],
  "W4:3": [],
  "W4:4": ["motor_feinmotorik_nutzt_beide_haende_koordiniert", "motor_planung_setzt_mehrteilige_motorische_auftraege_um"],
  "W4:5": ["motor_planung_setzt_mehrteilige_motorische_auftraege_um"],
  "W4:6": ["motor_planung_plant_einfache_bewegungs_oder_arbeitsschritte", "motor_planung_setzt_mehrteilige_motorische_auftraege_um", "cognition_gedaechtnis_merkt_sich_einfache_reihenfolgen"],

  "W5:1": [],
  "W5:2": ["motor_feinmotorik_nutzt_beide_haende_koordiniert"],
  "W5:3": ["perception_visuomotorik_linien_werden_noch_nicht_sicher_nachgespurt", "perception_visuomotorik_bei_visuomotorischen_aufgaben_geht_die_linie_n", "motor_graphomotorik_fuehrt_linien_nach"],
  "W5:4": ["perception_visuomotorik_einfache_formen_werden_mit_unterstuetzung_nach"],
  "W5:5": ["motor_feinmotorik_schneidet_entlang_einer_linie", "perception_visuomotorik_schneiden_entlang_einer_linie_benoetigt_noch_u"],
  "W5:6": ["motor_graphomotorik_haelt_den_stift_angemessen", "motor_feinmotorik_nutzt_beide_haende_koordiniert"],

  "W6:1": ["perception_taktil_kinaesthetisch_beruehrungen_am_eigenen_koerper_werden_noch_ni", "perception_taktil_kinaesthetisch_beruehrungen_am_eigenen_koerper_werden_noch_un"],
  "W6:2": ["perception_taktil_kinaesthetisch_beruehrungen_werden_noch_nicht_sicher_als_ange"],
  "W6:3": ["perception_taktil_kinaesthetisch_formen_oder_gegenstaende_werden_durch_tasten_n"],
  "W6:4": ["perception_taktil_kinaesthetisch_unterschiedliche_materialien_werden_noch_unsic"],
  "W6:5": ["perception_taktil_kinaesthetisch_taktile_eindruecke_benoetigen_beim_benennen_no"],
  "W6:6": ["perception_taktil_kinaesthetisch_auf_bestimmte_materialien_oder_beruehrungen_re", "perception_taktil_kinaesthetisch_klar_angekuendigte_taktile_erfahrungen_geben_s"],

  "L1:1": ["math_praenumerisch_sortiert_nach_farbe_form_oder_groesse", "cognition_denken_ordnet_bilder_oder_gegenstaende_sinnvoll"],
  "L1:2": ["math_praenumerisch_bildet_reihen_und_muster", "cognition_denken_erkennt_zusammenhaenge"],
  "L1:3": ["cognition_gedaechtnis_merkt_sich_einfache_reihenfolgen"],
  "L1:4": ["emotional_frustration_arbeitet_nach_misserfolg_weiter", "emotional_frustration_akzeptiert_alternative_handlungsvorschlaege"],
  "L1:5": ["cognition_denken_wendet_bekanntes_auf_neue_aufgaben_an"],

  "L2:1": [],
  "L2:2": ["cognition_denken_wendet_bekanntes_auf_neue_aufgaben_an"],
  "L2:3": ["cognition_gedaechtnis_ruft_geuebte_inhalte_ab"],
  "L2:4": ["cognition_gedaechtnis_ruft_geuebte_inhalte_ab"],
  "L2:5": ["cognition_denken_wendet_bekanntes_auf_neue_aufgaben_an"],

  "D1:1": ["german_phonologie_erkennt_reime", "speech_phonologie_reime_werden_noch_nicht_sicher_erkannt"],
  "D1:2": ["german_phonologie_klatscht_silben", "german_phonologie_gliedert_woerter_in_silben"],
  "D1:3": ["german_phonologie_hoert_anlaute", "perception_auditive_gliederung_anlaute_werden_noch_nicht_sicher_herausgehoert"],
  "D1:4": ["german_phonologie_verbindet_laute_zu_silben"],
  "D1:5": ["german_buchstaben_erkennt_bekannte_buchstaben", "german_buchstaben_benennt_bekannte_buchstaben"],
  "D1:6": ["german_buchstaben_ordnet_buchstaben_passende_laute_zu"],

  "D2:1": ["german_lesen_liest_silben"],
  "D2:2": ["german_lesen_liest_lautgetreue_woerter", "german_lesen_liest_nicht_nur_ratend"],
  "D2:3": ["german_lesen_liest_lautgetreue_woerter", "german_lesen_liest_kurze_woerter"],
  "D2:4": ["german_lesen_liest_wiederholte_woerter_zunehmend_sicher"],
  "D2:5": ["german_lesen_liest_einfache_saetze"],
  "D2:6": ["german_lesen_beantwortet_einfache_fragen_zum_gelesenen", "german_text_beantwortet_einfache_fragen"],

  "D3:1": ["german_buchstaben_schreibt_bekannte_buchstaben_formklar", "motor_graphomotorik_schreibt_buchstaben_formklar"],
  "D3:2": ["german_schreiben_verschriftet_hoerbare_laute"],
  "D3:3": ["german_schreiben_schreibt_lautgetreue_woerter", "german_schreiben_schreibt_woerter_nicht_nur_als_skelett", "german_schreiben_achtet_auf_vokale"],
  "D3:4": ["german_schreiben_nutzt_abschreibstrategien"],
  "D3:5": ["german_schreiben_setzt_wortgrenzen"],
  "D3:6": ["german_schreiben_kontrolliert_geschriebenes_mit_hilfe", "cognition_denken_ueberprueft_arbeitsergebnisse_mit_hilfe"],

  "D4:1": ["speech_verstehen_muendliche_auftraege_werden_noch_nicht_sicher_"],
  "D4:2": ["speech_verstehen_mehrteilige_auftraege_muessen_gegliedert_werde", "perception_auditives_gedaechtnis_visualisierte_auftraege_unterstuetzen_beim_beh"],
  "D4:3": ["speech_wortschatz_passende_woerter_werden_noch_nicht_sicher_gefu"],
  "D4:4": ["speech_grammatik_satzstrukturen_sind_noch_nicht_sicher_aufgebau"],
  "D4:5": ["speech_erzaehlen_erzaehlungen_sind_noch_nicht_sicher_geordnet", "german_text_erzaehlt_zu_bildern"],

  "D5:1": ["german_lesen_liest_lautgetreue_woerter", "german_lesen_liest_nicht_nur_ratend"],
  "D5:2": ["german_lesen_liest_einfache_saetze", "german_lesen_liest_kurze_texte"],
  "D5:3": [],
  "D5:4": ["german_text_findet_informationen_im_text"],
  "D5:5": ["german_text_gibt_inhalte_muendlich_wieder"],

  "D9:1": ["german_schreiben_schreibt_einfache_saetze", "german_text_formuliert_kurze_eigene_saetze"],
  "D9:2": [],
  "D9:3": ["german_sprache_untersuchen_achtet_auf_grossschreibung_bekannter_nomen"],
  "D9:4": ["german_sprache_untersuchen_spricht_woerter_zum_schreiben_deutlich_mit"],
  "D9:5": ["german_schreiben_nutzt_abschreibstrategien", "german_schreiben_kontrolliert_geschriebenes_mit_hilfe"],

  "M1:1": ["math_mengen_erfasst_kleine_mengen_simultan"],
  "M1:2": ["math_mengen_erkennt_wuerfelbilder", "math_mengen_erkennt_strukturierte_mengen_im_zehnerfeld"],
  "M1:3": ["math_mengen_ordnet_mengen_passenden_zahlen_zu", "math_ziffern_ordnet_ziffern_mengen_zu"],
  "M1:4": ["math_zaehlen_zaehlt_mengen_korrekt_ab", "math_zaehlen_haelt_die_eins_zu_eins_zuordnung_beim_zaehlen_"],
  "M1:5": ["math_mengen_erkennt_mehr_weniger_gleich", "math_mengen_vergleicht_mengen", "math_beziehungen_nutzt_groesser_kleiner_gleich"],
  "M1:6": ["math_zaehlen_zaehlt_von_einer_zahl_weiter"],

  "M2:1": ["math_ziffern_erkennt_ziffern", "math_ziffern_schreibt_ziffern_formklar"],
  "M2:2": ["math_ziffern_bestimmt_vorgaenger_und_nachfolger", "math_beziehungen_erkennt_nachbarzahlen"],
  "M2:3": ["math_ziffern_ordnet_zahlen_der_groesse_nach", "math_beziehungen_vergleicht_zahlen"],
  "M2:4": ["math_zahlenraum_orientiert_sich_bis_20"],
  "M2:5": ["math_zahlenraum_nutzt_zehner_und_einer", "math_beziehungen_nutzt_zehnerstruktur"],
  "M2:6": ["math_zahlenraum_orientiert_sich_bis_100"],

  "M3:1": ["math_zerlegung_zerlegt_zahlen_handelnd", "math_zerlegung_zerlegt_zahlen_bildlich"],
  "M3:2": ["math_zerlegung_ergaenzt_bis_10"],
  "M3:3": ["math_addition_subtraktion_versteht_plus_als_dazukommen"],
  "M3:4": ["math_addition_subtraktion_versteht_minus_als_wegnehmen"],
  "M3:5": ["math_addition_subtraktion_loest_einfache_aufgaben_zunehmend_ohne_materia", "math_addition_subtraktion_rechnet_nicht_ausschliesslich_zaehlend"],
  "M3:6": ["math_zerlegung_nutzt_zerlegungen_beim_rechnen", "math_addition_subtraktion_nutzt_rechenstrategien"],
  "M3:7": ["math_addition_subtraktion_erklaert_rechenwege_mit_unterstuetzung", "speech_erzaehlen_loesungswege_werden_noch_nicht_sicher_versprac"],

  "M4:1": ["math_praenumerisch_setzt_muster_fort"],
  "M4:2": ["math_sachrechnen_erfasst_einfache_sachsituationen"],
  "M4:3": ["math_sachrechnen_ordnet_einfache_rechenfragen_zu"],
  "M4:4": ["german_text_formuliert_kurze_eigene_saetze"],
  "M4:5": ["math_sachrechnen_vergleicht_laengen_oder_mengen_handelnd"],

  "M5:1": ["math_zahlenraum_liest_zahlen", "math_zahlenraum_schreibt_zahlen", "math_zahlenraum_ordnet_zahlen"],
  "M5:2": ["math_zahlenraum_nutzt_zehner_und_einer", "math_beziehungen_nutzt_zehnerstruktur"],
  "M5:3": ["math_addition_subtraktion_nutzt_rechenstrategien", "math_addition_subtraktion_rechnet_nicht_ausschliesslich_zaehlend"],
  "M5:4": ["math_addition_subtraktion_nutzt_rechenstrategien", "math_addition_subtraktion_rechnet_nicht_ausschliesslich_zaehlend"],
  "M5:5": ["math_addition_subtraktion_nutzt_rechenstrategien", "cognition_denken_erkennt_zusammenhaenge"],

  "V1:1": ["learning_aufgabenbeginn_beginnt_aufgaben_nach_aufforderung"],
  "V1:2": ["learning_aufgabenbeginn_beginnt_aufgaben_selbststaendig"],
  "V1:3": ["emotional_frustration_bleibt_in_schwierigen_situationen_ansprechbar"],
  "V1:4": ["cognition_aufmerksamkeit_nimmt_arbeit_nach_unterbrechung_wieder_auf", "emotional_frustration_arbeitet_nach_misserfolg_weiter"],
  "V1:5": [],

  "V2:1": ["speech_verstehen_muendliche_auftraege_werden_noch_nicht_sicher_"],
  "V2:2": ["learning_aufgabenbeginn_beginnt_aufgaben_nach_aufforderung", "learning_aufgabenbeginn_beginnt_aufgaben_selbststaendig"],
  "V2:3": ["learning_ausdauer_bleibt_bei_einer_aufgabe", "cognition_aufmerksamkeit_bleibt_bei_einer_aufgabe"],
  "V2:4": ["learning_organisation_arbeitet_nach_rueckmeldung_weiter", "emotional_frustration_arbeitet_nach_misserfolg_weiter"],
  "V2:5": ["learning_ausdauer_beendet_begonnene_aufgaben", "cognition_aufmerksamkeit_fuehrt_aufgaben_zu_ende"],
  "V2:6": ["cognition_denken_ueberprueft_arbeitsergebnisse_mit_hilfe"],

  "V3:1": ["emotional_frustration_akzeptiert_alternative_handlungsvorschlaege"],
  "V3:2": ["learning_aufgabenbeginn_fragt_bei_unklarheiten_nach", "speech_kommunikation_rueckfragen_werden_noch_nicht_sicher_gestellt"],
  "V3:3": ["cognition_denken_wendet_bekanntes_auf_neue_aufgaben_an"],
  "V3:4": ["cognition_denken_wendet_bekanntes_auf_neue_aufgaben_an"],
  "V3:5": ["emotional_frustration_bleibt_in_schwierigen_situationen_ansprechbar", "learning_ausdauer_bleibt_bei_einer_aufgabe"],

  "V4:1": ["emotional_frustration_bleibt_in_schwierigen_situationen_ansprechbar"],
  "V4:2": ["emotional_selbstkontrolle_kontrolliert_impulse"],
  "V4:3": ["emotional_kontakt_akzeptiert_grenzen_anderer", "emotional_selbstkontrolle_akzeptiert_ein_nein"],
  "V4:4": ["emotional_kontakt_holt_sich_hilfe_bei_konflikten"],
  "V4:5": ["emotional_kontakt_arbeitet_mit_anderen_zusammen", "learning_mitarbeit_arbeitet_mit_partnerkindern_zusammen"],
  "V4:6": [],

  "V6:1": [],
  "V6:2": [],
  "V6:3": [],
  "V6:4": [],
  "V6:5": []
};

export function competencyIdsForObservation(moduleId, itemId) {
  return COMPETENCY_LINKS[`${moduleId}:${itemId}`] || [];
}

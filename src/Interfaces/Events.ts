export default interface UpcomingEvent {
  link: string;
  name: string;
}

export interface FighterMatchupStatistic {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  Style: string;
  record: string;
  Height: any;
  stance: string;
  dob: string;
  weight: string;
  reach: string;
  slpm: number;
  str_acc: string;
  sapm: number;
  str_def: string;
  td_avg: number;
  td_acc: string;
  td_def: string;
  sub_avg: number;
}

export interface Count {
  [key: string]: number;
}

export interface FightAndWinner {
  fighter1: string;
  fighter2: string;
  count: Count;
  winner: string;
  index: number;
}

export interface BasicEventDetails {
  fighter_1: string;
  fighter_2: string;
  weight_class: string;
  link: string;
  index: number;
}

export interface AverageFightTime {
  [key: string]: string;
}

export interface Winner {
  [key: string]: string;
}

export interface Defense {
  // winner: Winner;
  [key: string]: string;
}

export interface FighterStatWinCount {
  [key: string]: number;
}

export interface FighterBasicFightStats {
  'Tale of the tape': AverageFightTime;
  'Wins/Losses/Draws': Defense;
  'Average Fight Time': AverageFightTime;
  Height: AverageFightTime;
  Weight: AverageFightTime;
  Reach: Defense;
  Stance: AverageFightTime;
  DOB: AverageFightTime;
  'Striking (Significant Strikes)': AverageFightTime;
  'Strikes Landed per Min. (SLpM)': Defense;
  'Striking Accuracy': Defense;
  'Strikes Absorbed per Min. (SApM)': Defense;
  Defense: Defense;
  Grappling: AverageFightTime;
  'Takedowns Average/15 min.': Defense;
  'Takedown Accuracy': Defense;
  'Takedown Defense': Defense;
  'Submission Average/15 min.': Defense;
  'Most recent fights (Newest First)': AverageFightTime;
  count: FighterStatWinCount;
  winner: Winner;
}

export interface FighterRecordAgainstOpponentAndStyle {
  fighter_with_better_record_against_opponent_style: string;
  fighter_with_more_wins_over_other: string;
  percentage_of_wins_fighter_1_has_against_fighter_2_style: number;
  percentage_of_wins_fighter_2_has_against_fighter_1_style: number;
  fighter_1_result_previous_results_against_fighter_2: string[];
  fighter_1_record_against_fighter_2: string;
  fighter_2_record_against_fighter_1: string;
  amount_of_times_fighter_1_has_fought_fighter_2_stance: number;
  amount_of_times_fighter_2_has_fought_fighter_1_stance: number;
  amount_of_wins_fighter_1_has_against_fighter_2_stance: number;
  amount_of_wins_fighter_2_has_against_fighter_1_stance: number;
  percentage_of_wins_fighter_1_has_against_fighter_2_stance: number;
  percentage_of_wins_fighter_2_has_against_fighter_1_stance: number;
  amount_of_times_fighter_1_has_fought_fighter_2_style: number;
  amount_of_times_fighter_2_has_fought_fighter_1_style: number;
  amount_of_wins_fighter_1_has_against_fighter_2_style: number;
  amount_of_wins_fighter_2_has_against_fighter_1_style: number;
}

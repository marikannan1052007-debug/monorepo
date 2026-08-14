export interface UserTopicProgress {
  user_id: string;
  completed: boolean;
}

export interface Topic {
  id: string;
  title: string;
  completed: boolean;
  user_topic_progress: UserTopicProgress[];
}

export interface Subject {
  id: string;
  name: string;
  topics: Topic[];
}
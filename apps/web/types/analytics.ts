export type Mission = {
  id: string;
  title: string;
  completed: boolean;
  completed_at: string | null;
};

export type UserTopicProgress = {
  completed: boolean;
  user_id: string;
};

export type Topic = {
  id: string;
  topic_name: string;
  user_topic_progress: UserTopicProgress[];
};

export type Subject = {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  syllabus_topics: Topic[];
};

export type FormattedTopic = {
  id: string;
  topic_name: string;
  completed: boolean;
};

export type FormattedSubject = {
  id: string;
  name: string;
  topics: FormattedTopic[];
};

export type MissionHistory = {
  completed_at: string;
};
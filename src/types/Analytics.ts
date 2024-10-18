type PageView = { name: 'Page View'; payload: { screenName: string } };
type SignIn = { name: 'Sign In'; payload?: undefined };
type SignOut = { name: 'Sign Out'; payload?: undefined };
type Register = { name: 'Register'; payload?: undefined };
type Practice = { name: 'Practice'; payload: { taskTitle: string; sessionNumber: number } };
type ApproveSession = {
  name: 'Approve Session';
  payload: { taskTitle: string; sessionNumber: number; approveTimeHours: number };
};
type ApproveAllSessions = {
  name: 'Approve all sessions';
  payload: { numberApproved: number };
};
type CompletePractice = {
  name: 'Complete Practice';
  payload: { taskTitle: string; sessionNumber: number; hoursFromDeadline: number };
};
type GiveFeedback = {
  name: 'Give Feedback';
  payload: { taskTitle: string; sessionNumber: number };
};
type AddStudent = {
  name: 'Add Student';
  payload?: undefined;
};

type AddTask = {
  name: 'Add Task';
  payload: {
    sessionAmount: number;
    sessionLength: number;
    attachmentCount: number;
  };
};

type ViewTeacherNotes = {
  name: 'View Teacher Notes';
  payload?: undefined;
};

type ChangeProfilePicture = {
  name: 'Change Profile Picture';
  payload?: undefined;
};

export type AnalyticsPayload =
  | PageView
  | SignIn
  | SignOut
  | Register
  | Practice
  | ApproveSession
  | ApproveAllSessions
  | CompletePractice
  | GiveFeedback
  | AddStudent
  | AddTask
  | ViewTeacherNotes
  | ChangeProfilePicture;

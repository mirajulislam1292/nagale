export type Role = 'client' | 'provider' | 'admin';
export type OrderStatus =
  | 'accepted'
  | 'escrow_funded'
  | 'details_unlocked'
  | 'delivered'
  | 'completed'
  | 'disputed';
export interface Provider {
  id: string;
  name: string;
  initials: string;
  headline: string;
  area: string;
  skills: string[];
  rating: number;
  completed: number;
  price: number;
  verified: boolean;
  bio: string;
}
export interface Gig {
  id: string;
  title: string;
  category: string;
  type: 'digital' | 'local';
  summary: string;
  budget: number;
  area: string;
  deadline: string;
  status: 'open' | 'in_progress' | 'closed';
  proposals: number;
}
interface Proposal {
  id: string;
  gigId: string;
  providerId: string;
  price: number;
  days: number;
  message: string;
}
export interface Order {
  id: string;
  title: string;
  providerId: string;
  price: number;
  status: OrderStatus;
  clientAccepted: boolean;
  providerAccepted: boolean;
  delivery?: string;
  privateDetails?: { workspaceNotes: string };
  events: { text: string; at: string }[];
}
interface Message {
  id: string;
  sender: 'you' | 'provider';
  body: string;
  at: string;
}
interface Case {
  id: string;
  subject: string;
  reason: string;
  risk: 'low' | 'medium' | 'high';
  status: 'open' | 'reviewed';
}
export interface Snapshot {
  providers: Provider[];
  gigs: Gig[];
  proposals: Proposal[];
  orders: Order[];
  messages: Message[];
  cases: Case[];
  feeRate: number;
}

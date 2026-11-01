export type Role = 'client' | 'provider' | 'admin';
export type OrderStatus =
  | 'accepted'
  | 'escrow_funded'
  | 'details_unlocked'
  | 'delivered'
  | 'completed'
  | 'disputed';
interface Provider {
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
  reviews?: number;
  level?: number;
  accountStatus?: 'active' | 'suspended';
  verification?: { l1: string; l2: string; l3: string };
}
export interface Gig {
  clientId?: string;
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
  clientId?: string;
  deliveryFile?: string;
  id: string;
  title: string;
  providerId: string;
  clientName?: string;
  price: number;
  status: OrderStatus;
  clientAccepted: boolean;
  providerAccepted: boolean;
  delivery?: string;
  privateDetails?: { workspaceNotes: string };
  events: { text: string; at: string }[];
}
interface Message {
  senderId?: string;
  orderId?: string;
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

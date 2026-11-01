import { useState } from 'react';
import { Users, Link as LinkIcon, UserX, UserCheck } from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useMarket, useApp, useCopy } from '../../app/context';

interface UserRecord {
  id: string;
  name: string;
  initials: string;
  role: 'client' | 'provider';
  joinedDate: string;
  ordersCount: number;
  status: 'active' | 'suspended';
  flagged?: boolean;
}

export function AdminUsers() {
  const { providers } = useMarket();
  const { notify } = useApp();
  const c = useCopy();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<
    'all' | 'client' | 'provider' | 'flagged' | 'suspended'
  >('all');

  // Synthesize users combining real providers + clients
  const [users, setUsers] = useState<UserRecord[]>([
    {
      id: 'usr-client-1',
      name: 'Mahim Rahman',
      initials: 'MR',
      role: 'client',
      joinedDate: 'Jan 2026',
      ordersCount: 4,
      status: 'active',
    },
    {
      id: 'usr-client-2',
      name: 'Samira Reza',
      initials: 'SR',
      role: 'client',
      joinedDate: 'Feb 2026',
      ordersCount: 2,
      status: 'active',
      flagged: true,
    },
    ...providers.map((p, idx) => ({
      id: p.id,
      name: p.name,
      initials: p.initials,
      role: 'provider' as const,
      joinedDate: 'Nov 2025',
      ordersCount: p.completed,
      status: p.accountStatus ?? ('active' as const),
      flagged: idx === 1,
    })),
  ]);

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'active' ? 'suspended' : 'active';
          notify(
            c(
              `User ${u.name} is now ${nextStatus} (demo mode).`,
              `ব্যবহারকারী ${u.name} এখন ${nextStatus === 'active' ? 'সক্রিয়' : 'স্থগিত'} (ডেমো মোড)।`,
            ),
          );
          return { ...u, status: nextStatus };
        }
        return u;
      }),
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.id.toLowerCase().includes(query.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'client') return u.role === 'client';
    if (filter === 'provider') return u.role === 'provider';
    if (filter === 'flagged') return u.flagged;
    if (filter === 'suspended') return u.status === 'suspended';
    return true;
  });

  return (
    <div className="w-full py-8">
      <LayoutContainer variant="app">
        {/* Header */}
        <div className="pb-4 mb-6 border-b border-moss-200">
          <div className="flex items-center gap-2 mb-1">
            <Users size={20} className="text-moss-700" />
            <h1 className="text-h3 font-bold text-moss-900 tracking-tight">
              {c(
                'Platform User Directory',
                'প্ল্যাটফর্ম ব্যবহারকারী ডিরেক্টরি',
              )}
            </h1>
          </div>
          <p className="text-small text-moss-600">
            {c(
              'Manage client accounts, verified providers, trust flags and suspension states.',
              'ক্লায়েন্ট অ্যাকাউন্ট, প্রোভাইডার, ট্রাস্ট ফ্ল্যাগ ও অ্যাকাউন্ট স্থগিতকরণ ব্যবস্থাপনা।',
            )}
          </p>
        </div>

        {/* Toolbar: Search + Filter Chips */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="w-full sm:w-80">
            <Input
              placeholder={c(
                'Search by name or ID…',
                'নাম বা আইডি দিয়ে খুঁজুন…',
              )}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: c('All Users', 'সকল') },
              { id: 'client', label: c('Clients', 'ক্লায়েন্ট') },
              { id: 'provider', label: c('Providers', 'প্রোভাইডার') },
              { id: 'flagged', label: c('Flagged', 'ফ্ল্যাগড') },
              { id: 'suspended', label: c('Suspended', 'স্থগিত') },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as typeof filter)}
                className={`px-3 py-1.5 text-caption rounded-sm font-medium transition-colors cursor-pointer ${
                  filter === f.id
                    ? 'bg-moss-900 text-white'
                    : 'bg-moss-100 text-moss-700 hover:bg-moss-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <Card variant="flat" className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-moss-200 bg-mist text-caption font-bold text-moss-600 normal-case tracking-wider">
                  <th className="py-3 px-4">{c('User', 'ব্যবহারকারী')}</th>
                  <th className="py-3 px-4">{c('Role', 'ভূমিকা')}</th>
                  <th className="py-3 px-4">{c('Joined', 'যোগদান')}</th>
                  <th className="py-3 px-4">{c('Orders', 'অর্ডার')}</th>
                  <th className="py-3 px-4">{c('Status', 'অবস্থা')}</th>
                  <th className="py-3 px-4 text-right">
                    {c('Action', 'পদক্ষেপ')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-moss-100 text-small">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-mist/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar initials={u.initials} size="sm" />
                        <div>
                          <strong className="font-bold text-moss-900 block truncate">
                            {u.name}
                          </strong>
                          <span className="text-caption text-moss-400 tabular-nums">
                            {u.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge
                        tone={u.role === 'provider' ? 'success' : 'neutral'}
                      >
                        {u.role === 'provider'
                          ? c('Provider', 'প্রোভাইডার')
                          : c('Client', 'ক্লায়েন্ট')}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-moss-600">
                      {u.joinedDate}
                    </td>

                    <td className="py-3.5 px-4 font-variant-numeric tabular-nums font-medium text-moss-800">
                      {u.ordersCount}
                    </td>

                    <td className="py-3.5 px-4">
                      {u.status === 'suspended' ? (
                        <Badge tone="danger">{c('Suspended', 'স্থগিত')}</Badge>
                      ) : u.flagged ? (
                        <Badge tone="warning">{c('Flagged', 'ফ্ল্যাগড')}</Badge>
                      ) : (
                        <Badge tone="success">{c('Active', 'সক্রিয়')}</Badge>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        {u.role === 'provider' && (
                          <a
                            href={`/p/${u.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-moss-500 hover:text-moss-900 rounded-sm hover:bg-moss-100"
                            title="View public profile"
                          >
                            <LinkIcon size={14} />
                          </a>
                        )}
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-2.5 py-1 text-caption font-medium rounded-sm border transition-colors cursor-pointer ${
                            u.status === 'suspended'
                              ? 'border-deep-300 text-deep-700 bg-deep-50 hover:bg-deep-100'
                              : 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100'
                          }`}
                        >
                          {u.status === 'suspended' ? (
                            <span className="flex items-center gap-1">
                              <UserCheck size={12} />{' '}
                              {c('Restore', 'পুনরুদ্ধার')}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <UserX size={12} /> {c('Suspend', 'স্থগিত')}
                            </span>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </LayoutContainer>
    </div>
  );
}

import React from 'react'

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const orderStatusDisplayNames: Record<string, string> = {
    ALL: 'Todos',
    CANCELED: 'Cancelado',
    COMPLETED: 'Concluído',
    PENDING: 'Pendente',
    AWAITING_WITHDRAWAL: 'Aguardando Retirada',
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING':
        return '#F1B04E'
      case 'AWAITING_WITHDRAWAL':
        return '#66ABA5'
      case 'COMPLETED':
        return '#0AC200'
      case 'CANCELED':
        return '#E26B5A'
      default:
        return '#F1B04E'
    }
  }

  const color = getStatusColor(status)
  const label = orderStatusDisplayNames[status] || status

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: color,
          display: 'inline-block',
        }}
      />
      <span>{label}</span>
    </div>
  )
}

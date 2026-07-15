interface ActivitySuccessProps {
  icon: string;
  title: string;
  message: string;
  hasKeyPiece?: boolean;
}

export function ActivitySuccess({
  icon,
  title,
  message,
  hasKeyPiece = true,
}: ActivitySuccessProps) {
  return (
    <div className="activity-success" role="status">
      <div className="activity-success__burst" aria-hidden="true">
        ✦
      </div>
      <span className="activity-success__icon" aria-hidden="true">
        {icon}
      </span>
      <h3>{title}</h3>
      <p>{message}</p>
      {hasKeyPiece && (
        <div className="key-reward">
          <span aria-hidden="true">🗝️</span>
          <strong>¡Encontraste una pieza de la llave!</strong>
        </div>
      )}
    </div>
  );
}

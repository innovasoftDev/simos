import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
          <AvatarFallback>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FFFFFF" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Servicio api-ventas</p>
          <p className="text-sm text-muted-foreground">
            Descripción Alerta
          </p>
        </div>
        <div className="ml-auto font-medium">+1</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          {/* <AvatarImage src="/avatars/02.png" alt="Avatar" /> */}
          <AvatarFallback>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FFFFFF" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Servicio icommerce-TGU</p>
          <p className="text-sm text-muted-foreground">Error</p>
        </div>
        <div className="ml-auto font-medium">+1</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/avatars/03.png" alt="Avatar" /> */}
          <AvatarFallback>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FFFFFF" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Nombre del servicio con alerta</p>
          <p className="text-sm text-muted-foreground">
            Descripción de la alerta.
          </p>
        </div>
        <div className="ml-auto font-medium">+2</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/avatars/04.png" alt="Avatar" /> */}
          <AvatarFallback>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FFFFFF" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Nombre del servicio con alerta</p>
          <p className="text-sm text-muted-foreground">Descripción de la alerta.</p>
        </div>
        <div className="ml-auto font-medium">+6</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          {/* <AvatarImage src="/avatars/05.png" alt="Avatar" /> */}
          <AvatarFallback>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#FFFFFF" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Nombre de servicio con error</p>
          <p className="text-sm text-muted-foreground">Descripción del error.</p>
        </div>
        <div className="ml-auto font-medium">+5</div>
      </div>
    </div>
  );
}

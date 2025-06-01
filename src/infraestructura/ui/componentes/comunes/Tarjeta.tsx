 
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TarjetaProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  animada?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevacion?: 'none' | 'sm' | 'md' | 'lg';
  borde?: boolean;
  redondeado?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const Tarjeta = ({
  children,
  className = '',
  hover = false,
  onClick,
  animada = false,
  padding = 'md',
  elevacion = 'md',
  borde = false,
  redondeado = 'lg'
}: TarjetaProps) => {
  // Mapas de clases según las propiedades
  const paddingClases = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8'
  };

  const elevacionClases = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg'
  };

  const redondeadoClases = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl'
  };

  // Construir las clases CSS
  const claseBase = 'bg-white dark:bg-gray-800 transition-all duration-300';
  const claseBorde = borde ? 'border border-gray-200 dark:border-gray-700' : '';
  const claseHover = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : '';
  const clasesCombinadas = `${claseBase} ${paddingClases[padding]} ${elevacionClases[elevacion]} ${redondeadoClases[redondeado]} ${claseBorde} ${claseHover} ${className}`;

  // Variantes para la animación
  const variantes = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (animada) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variantes}
        whileHover={hover ? { y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' } : {}}
        className={clasesCombinadas}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={clasesCombinadas} onClick={onClick}>
      {children}
    </div>
  );
};

export default Tarjeta;
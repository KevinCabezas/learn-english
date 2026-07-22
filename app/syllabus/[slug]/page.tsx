// app/blog/[slug]/page.tsx

// 1. Definimos la estructura de TypeScript para los parámetros
interface ParametrosRuta {
  params: Promise<{ slug: string }>;
}

export default async function ArticuloBlogPage({ params }: ParametrosRuta) {
  // 2. Esperamos (await) a que Next.js nos resuelva los parámetros de la URL
  const { slug } = await params;

  // 3. Opcional: Limpiamos los guiones para mostrar un título bonito
  const tituloBonito = slug.replace(/-/g, " ");

  return (
    <div className="max-w-3xl">
      <article className="prose prose-invert bg-white/5 p-8 rounded-2xl border border-gray-200/10">
        {/* Categoría o etiqueta superior */}
        <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
          Lección Escogida
        </span>

        {/* Título dinámico que cambia según el Link que tocaste */}
        <h1 className="text-4xl font-extrabold text-white mt-2 mb-6 capitalize">
          {tituloBonito}
        </h1>

        {/* Contenido simulado del artículo */}
        <div className="text-gray-300 space-y-4 leading-relaxed">
          <p>
            ¡Bienvenido a la clase exclusiva sobre <strong>{tituloBonito}</strong>!
          </p>
          <p>
            Este texto se está cargando de manera dinámica gracias a que Next.js leyó la palabra 
            <code className="bg-red-500/20 text-red-400 px-2 py-1 rounded mx-1 font-mono text-sm">
              {slug}
            </code> 
            directamente desde la URL del navegador.
          </p>
          <p className="text-sm text-gray-400 pt-4 border-t border-gray-200/10">
            En un paso avanzado, usaremos este string para buscar la información guardada en tu base de datos de Supabase.
          </p>
        </div>
      </article>
    </div>
  );
}

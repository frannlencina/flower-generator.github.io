import P5Sketch from "@/components/P5Sketch"
import Footer from "@/components/Footer";

export default function Flower() {
    return (
        <div className="w-full mx-auto flex flex-col items-center justify-center bg-[#f4f5fa]">
            <div className="flex justify-center items-centermax-w-4xl mx-auto mt-12">
                <P5Sketch />
            </div>
            <div className="flex flex-col gap-8 mt-32 md:min-w-xl max-w-2xl mx-auto pb-42">
                <div className="flex flex-col justify-start items-start gap-2">
                    <h2 className="font-bold text-2xl text-[#414141]">Por que?</h2>
                    <div className="opacity-60 indent-2">
                        <p>
                            A vos te gustan las flores y las matematicas, a mi me gusta la
                            programacion y vos
                        </p>
                        <p>
                            Que mejor que hacerte con programacion flores infinitas?{" "}
                            <span className="italic">un detallesito digial je</span>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-5">
                    <h2 className="font-bold text-2xl text-[#414141]">Explicacion</h2>
                    <div className="opacity-60 flex flex-col gap-3 ">
                        <p>
                            Tiene una explicacion matematica y fisica para poder generar las
                            flores de forma aleatoria
                        </p>
                        <p>
                            El algoritmo para generar las flores utiliza geometría polar,
                            funciones trigonométricas y transformaciones paramétricas
                        </p>
                        <p>
                            Me tuve que ayudar un poco de chat gpt porque no se me dan bien
                            las maetematicas pero la intension es lo que cuenta se me da
                            bien programar jajaj
                        </p>

                        <h4 className="font-semibold text-2xl mt-5">
                            Bueno te explico como funciona el algoritmo
                        </h4>
                        <div className="math-box">
                            <p className="equation">r(θ) = R · f(kθ)</p>
                            <p>Donde:</p>
                            <ul>
                                <li><span className="keyword">R</span> = radio base de la flor</li>
                                <li><span className="keyword">k</span> = número de pétalos (controla la frecuencia)</li>
                                <li><span className="keyword">θ</span> = ángulo en radianes</li>
                                <li><span className="keyword">f</span> = función generadora (seno, coseno o combinación)</li>
                            </ul>
                        </div>

                        <h2>Funciones Generadoras Principales</h2>
                        <p>El algoritmo usa cuatro variantes matemáticas para crear diferentes formas de pétalos:</p>

                        <div className="math-box">
                            <p className="equation">1. r(θ) = R · sin(kθ) (Rosácea simple)</p>
                            <p className="equation">2. r(θ) = R · |sin(kθ)| (Pétalos continuos)</p>
                            <p className="equation">3. r(θ) = R · sin(kθ)cos(θ) (Efecto de torsión)</p>
                            <p className="equation">4. r(θ) = R · (0.5 + 0.5sin(kθ)) (Normalizado)</p>
                        </div>

                        <h2>Física en el Modelado</h2>
                        <p>El diseño incorpora principios físicos:</p>
                        <ul>
                            <li><span className="keyword">Óptica:</span> El modelo HSL simula cómo la luz interactúa con pigmentos</li>
                            <li><span className="keyword">Mecánica de ondas:</span> Los patrones repiten estructuras de ondas estacionarias</li>
                            <li><span className="keyword">Filotaxis:</span> La disposición de pétalos sigue patrones de crecimiento natural</li>
                        </ul>

                        <div className="math-box">
                            <p>Posición cartesiana de cada punto:</p>
                            <p className="equation">x(θ) = r(θ)·cos(θ + twist)</p>
                            <p className="equation">y(θ) = r(θ)·sin(θ + twist)</p>
                            <p>Donde <span className="keyword">twist</span> introduce variación aleatoria (efecto de "viento")</p>
                        </div>

                        <h2>Estructura Multicapa</h2>
                        <p>Las flores se construyen con capas superpuestas que siguen:</p>
                        <div className="math-box">
                            <p className="equation">Rₗ = R₀ + l·ΔR (Serie aritmética)</p>
                            <p className="equation">kₗ = k₀ + l (Pétalos por capa)</p>
                            <p className="equation">θₗ = θ + (180°/kₗ)·paridad(l) (Desfase angular)</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
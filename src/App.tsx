import { useState } from "react";
import Styles from "./App.module.css";
import poweredImage from './assets/powered.png';
import { GridItem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png';

import { levels, calculateImc, Level } from './helpers/imc';

function App() {
  const [heightField, setheightField] = useState<number>(0);
  const [weightField, setweightFild] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else (
      alert('Digite todos os campos.')
    )
  }

  const handleBackButton = () =>{
    setToShow(null);
    setheightField(0);
    setweightFild(0);
  }

  return (
    <div className={Styles.main}>
      <header>
        <div className={Styles.headerContainer}>
          <img src={poweredImage} width={150} />
        </div>
      </header>
      <div className={Styles.container}>
        <div className={Styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é sigla para indice de Massa Carpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
          <input
            type="number"
            placeholder="Digite a sua altura Ex: 1.5 (em métros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setheightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder="Digite o seu peso Ex: 75.3 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setweightFild(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        
        </div>
        <div className={Styles.rightSide}>
          {!toShow &&
            <div className={Styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          }
          {toShow &&
            <div className={Styles.rightBig}>
              <div className={Styles.righyArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;

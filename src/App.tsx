import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { GridItem } from './components/GridItem';


import { levels, calculateImc, Level } from './helpers/imc';

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert('Digite os valores nos campos.')
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.HeaderContainer}>
          <img src={poweredImage} alt="" width={200} />
        </div>
      </header>
      <div className={styles.container}>
        
         <div className={styles.LeftSide}>
            <h1>Calcule o seu IMC.</h1>
            <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial da Saúde para calcular o peso ideal de cada pessoa.</p>

            <input
            type="number"
            placeholder="Digite a sua altura. Ex: 1.5 (em metros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(Number(e.target.value))} 
            disabled={toShow ? true : false}
            />

            <input
            type="number"
            placeholder="Digite o seu peso. Ex: 75.8 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(Number(e.target.value))} 
            disabled={toShow ? true : false}
            />

            <button disabled={toShow ? true : false} onClick={handleCalculateButton}>Calcular</button>
         </div>

         <div className={styles.RightSide}>
            {!toShow &&
              <div className={styles.grid}>
                {levels.map((item, key) => 
                  <GridItem key={key} item={item} />
                )}
              </div>  
            }

            {toShow && 
              <div className={styles.rightBig}>
                <div className={styles.rightArrow} onClick={handleBackButton}>
                  <img src={leftArrowImage} alt="" width={25} />
                </div>
                <GridItem item={toShow}/>
              </div>
            }
         </div>
      </div>
    </div>  
  );
}

export default App;

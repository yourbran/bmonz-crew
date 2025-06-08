'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import Picker from 'react-mobile-picker';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from '@/styles/TrainingRegister.module.css';
import { Exercise, Routine, WeightOption, AngleOption } from '@/types/training';

interface Props {
  routines: Routine[];
  weights: WeightOption[];
  angles: AngleOption[];
}

type PickerKey = '종류' | '무게' | '각도';
type PickerData = Record<PickerKey, string[]>;
type PickerValue = Record<PickerKey, string>;

export default function TrainingRegister({ routines, weights, angles }: Props) {
  const router = useRouter();

  const defaultRoutine = routines[0]?.name || '';
  const defaultWeight = weights[0]?.value || 0;
  const defaultAngle = angles[0]?.value || 0;


  // --- Step & Date ---
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  // --- Picker 상태 ---
  const [showPicker, setShowPicker] = useState(false);
  const [pickerData] = useState<PickerData>({
    종류: routines.map(r => r.name),
    무게: weights.map(w => w.value.toString()),
    각도: angles.map(a => a.value.toString()),
  });
  const [pickerValue, setPickerValue] = useState<PickerValue>({
    종류: defaultRoutine,
    무게: defaultWeight.toString(),
    각도: defaultAngle.toString(),
  });

  // 선택값 분리 저장
  const [selectedRoutine, setSelectedRoutine] = useState(defaultRoutine);
  const [selectedWeight, setSelectedWeight] = useState<number>(defaultWeight);
  const [selectedAngle, setSelectedAngle] = useState<number>(defaultAngle);

  // Picker 확인
  const confirmPicker = () => {
    setSelectedRoutine(pickerValue.종류);
    setSelectedWeight(+pickerValue.무게);
    setSelectedAngle(+pickerValue.각도);
    setShowPicker(false);
  };
  
  // --- Exercise 등록용 상태 ---
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [unit, setUnit] = useState<'Reps' | 'Sec'>('Reps');
  const [value, setValue] = useState(0);
  const [sets, setSets] = useState(1);
  const [rest, setRest] = useState(60);

  useEffect(() => {
    const r = routines.find(r => r.name === selectedRoutine);
    if (r) setUnit(r.cls === 'R' ? 'Reps' : 'Sec');
  }, [selectedRoutine, routines]);

  const addExercise = () => {
    if (!selectedRoutine || value <= 0 || sets <= 0) return;
    setExercises(prev => [
      ...prev,
      {
        id: Date.now(),
        name: selectedRoutine,
        unit,
        value,
        sets,
        rest,
      }
    ]);

    // 초기화
    setSelectedRoutine(defaultRoutine);
    setSelectedWeight(defaultWeight);
    setSelectedAngle(defaultAngle);
    setValue(0);
    setSets(1);
    setRest(60);
    setPickerValue({
      종류: defaultRoutine,
      무게: defaultWeight.toString(),
      각도: defaultAngle.toString(),
    });
  };

  const handleRegister = async () => {
    await fetch('/api/training', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, exercises }),
      cache: 'no-store',
    });
    router.push('/training/history');
  };

  const formattedDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  });

  return (
    <div className={styles.container}>
      {/* Step1 always visible */}
      <section className={`${styles.stepSection} ${step === 1 ? styles.active : styles.inactive}`}>
        <h2 className={styles.stepTitle}>훈련 일자 선택</h2>
        <div className={styles.dateBoxWrapper}>
          <div className={styles.dateBox}>
            <div className={`${styles.dateBoxInner} ${step === 1 ? styles.centered : ''}`} key={step}>
              {step === 1
                ? <span>{formattedDate}</span>
                : <><span>훈련일자</span><span>{formattedDate}</span></>
              }
            </div>
          </div>
          {step === 1 && (
            <button
              type="button"
              className={styles.changeLink}
              onClick={() => setShowCalendar(!showCalendar)}
            >
              훈련 일자 변경
            </button>
          )}
        </div>
        {step === 1 && showCalendar && (
          <div className={styles.datePickerWrapper}>
            <DatePicker
              selected={date}
              onChange={d => { if (d) setDate(d); setShowCalendar(false); }}
              inline
              className={styles.datePicker}
            />
          </div>
        )}
        {step === 1 && (
          <div className={styles.navGroup}>
            <button className={styles.prevButton} onClick={() => router.push('/training')}>이전</button>
            <button className={styles.nextButton} onClick={() => setStep(2)}>훈련 루틴 등록</button>
          </div>
        )}
      </section>

      {/* Step2 */}
      {step === 2 && (
        <section className={`${styles.stepSection} ${styles.active}`}>
          <h2 className={styles.stepTitle}>훈련 루틴 등록</h2>

          {/* 1) 모바일 피커 오픈 버튼 */}
          <div className={styles.fieldGroup}>
            <button
              type="button"
              className={styles.input}
              onClick={() => setShowPicker(true)}
            >
              {selectedRoutine} / {selectedWeight}kg / {selectedAngle}°
            </button>
          </div>

          {/* Picker 팝업 */}
          {showPicker && (
            <div className={styles.pickerOverlay} onClick={() => setShowPicker(false)}>
              <div className={styles.pickerContainer} onClick={e => e.stopPropagation()}>
                <Picker
                  value={pickerValue}
                  onChange={setPickerValue}
                  height={200}
                >
                  <Picker.Column name="종류">
                    {routines.map((item) => (
                      <Picker.Item key={item.name} value={item.name}>
                        {item.name}
                      </Picker.Item>
                    ))}
                  </Picker.Column>

                  <Picker.Column name="무게">
                    {weights.map((item) => (
                      <Picker.Item key={item.value} value={item.value.toString()}>
                        {item.value}
                      </Picker.Item>
                    ))}
                  </Picker.Column>

                  <Picker.Column name="각도">
                    {angles.map((item) => (
                      <Picker.Item key={item.value} value={item.value.toString()}>
                        {item.value}
                      </Picker.Item>
                    ))}
                  </Picker.Column>
                </Picker>
                <button
                  className={styles.pickerConfirm}
                  onClick={confirmPicker}
                  type="button"
                >
                  확인
                </button>
              </div>
            </div>
          )}

          {/* 2nd row: value, sets, rest with labels */}
          {step === 2 && (
          <div className={styles.fieldGroup}>
          {/* 횟수/시간 선택 */}
          <div className={styles.inputWrapper}>
            <p className={styles.inputLabel}>
              {unit === 'Reps' ? '횟수' : '시간'}
            </p>
            <Slider
              min={1}
              max={unit === 'Reps' ? 20 : 20}
              step={1}
              value={value}
              onChange={(v) => setValue(v as number)}
              className={styles.slider}
            />
            <div className={styles.sliderValue}>
              {value}
            </div>
          </div>

          {/* 세트 수 */}
          <div className={styles.inputWrapper}>
            <p className={styles.inputLabel}>세트 수</p>
            <Slider
              min={1}
              max={10}
              step={1}
              value={sets}
              onChange={(v) => setSets(v as number)}
              className={styles.slider}
            />
            <div className={styles.sliderValue}>{sets}</div>
          </div>

          {/* 휴식 */}
          <div className={styles.inputWrapper}>
            <p className={styles.inputLabel}>쉬는 시간</p>
            <Slider
              min={0}
              max={180}
              step={5}
              value={rest}
              onChange={(v) => setRest(v as number)}
              className={styles.slider}
            />
            <div className={styles.sliderValue}>{rest}</div>
          </div>
        </div>
          )}

          {/* 루틴 추가 버튼 */}
          {step === 2 && (
            <button className={styles.addButtonLight} onClick={addExercise}>
              루틴 추가
            </button>
          )}

          <ul className={styles.exerciseList}>
            {exercises.map(e => (
              <li key={e.id} className={styles.exerciseItem}>
                <span className={styles.listItemText}>{e.name} - {e.value} {e.unit} x {e.sets} (Rest {e.rest}s)</span>
                <button className={styles.deleteButton} onClick={() => setExercises(prev => prev.filter(x => x.id !== e.id))}>삭제</button>
              </li>
            ))}
          </ul>

          <div className={styles.navGroup}>
            <button className={styles.prevButton} onClick={() => setStep(1)}>이전</button>
            <button
              className={styles.nextButton}
              disabled={exercises.length === 0}
              onClick={() => exercises.length > 0 && setStep(3)}
            >
              다음
            </button>
          </div>
        </section>
      )}

    {step === 3 && (
      <section className={styles.stepSection}>
        <h2 className={styles.stepTitle}>성취도 입력</h2>
        <div className={styles.step3List}>
          {exercises.map(e => (
            <div key={e.id} className={styles.step3Item}>
              <div className={styles.step3Name}>{e.name}</div>
              <select className={styles.step3Select} defaultValue="100">
                <option value="40">40%</option>
                <option value="60">60%</option>
                <option value="80">80%</option>
                <option value="100">100%</option>
              </select>
            </div>
          ))}
        </div>
        <div className={styles.navGroup}>
          <button className={styles.prevButton} onClick={() => setStep(2)}>이전</button>
          <button className={styles.registerButton} onClick={handleRegister}>등록</button>
        </div>
      </section>
          )}
    </div>
  );
}
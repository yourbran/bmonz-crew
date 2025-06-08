export const dynamic = 'force-dynamic'

import TrainingRegister from '@/components/TrainingRegister'
import pool from '@/services/db'
import {
  Routine,
  WeightOption,
  AngleOption
} from '@/types/training'

export default async function RegisterPage() {
  // 1) 루틴 목록
  const routRes = await pool.query(`
    SELECT
      rout_name AS name,
      rout_cls_cd AS cls
    FROM bmonz_rout_list
    ORDER BY name
  `)

  // 2) 중량 옵션 (0~100, 5단위)
  const weigRes = await pool.query(`
    SELECT
      weig AS value
    FROM bmonz_weig_list
    ORDER BY weig
  `)

  // 3) 각도 옵션 (0~45, 1단위)
  const anglRes = await pool.query(`
    SELECT
      angl AS value
    FROM bmonz_angl_list
    ORDER BY angl
  `)

  const routines = JSON.parse(JSON.stringify(routRes.rows)) as Routine[]
  const weights  = JSON.parse(JSON.stringify(weigRes.rows)) as WeightOption[]
  const angles   = JSON.parse(JSON.stringify(anglRes.rows)) as AngleOption[]

  return (
    <TrainingRegister
      routines={routines}
      weights={weights}
      angles={angles}
    />
  )
}
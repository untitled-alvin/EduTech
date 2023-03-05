type ValidationEmailProblem = "empty" | "short" | "invalid"

export function validationEmail(email: string): ValidationEmailProblem {
  if (!email?.length) return "empty"
  if (email?.length < 6) return "short"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "invalid"
  return undefined
}

type ValidationPasswordProblem = "empty" | "short"

export function validationPassword(password: string): ValidationPasswordProblem {
  if (!password?.length) return "empty"
  if (password.length < 6) return "short"
  return undefined
}

type ValidationFullnameProblem = "empty"

export function validationFullname(fullname: string): ValidationFullnameProblem {
  if (!fullname?.length) return "empty"
  return undefined
}


type ValidationNicknameProblem = "empty"

export function validationNickname(fullname: string): ValidationNicknameProblem {
  if (!fullname?.length) return "empty"
  return undefined
}

type ValidationBirthdateProblem = "empty" | "invalid"

export function validationBirthdate(birthdate: Date): ValidationBirthdateProblem {
  if (!birthdate) return "empty"
  return undefined
}

type ValidationPhoneProblem = "empty" | "invalid"

export function validationPhone(phone: string): ValidationPhoneProblem {
  if (!phone?.length) return "empty"
  if (!/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(phone)) return "invalid"
  // if (/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(phone)) return "invalid"
  return undefined
}

type ValidationOccupationProblem = "empty" | "short" | "long"

export function validationOccupation(occupation: string): ValidationOccupationProblem {
  if (!occupation?.length) return "empty"
  if (occupation?.length < 6) return "short"
  if (occupation?.length > 100) return "long"
  return undefined
}

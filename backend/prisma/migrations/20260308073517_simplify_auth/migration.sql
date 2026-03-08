/*
  Warnings:

  - You are about to drop the column `accountVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordExpire` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCodeExpire` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "accountVerified",
DROP COLUMN "resetPasswordExpire",
DROP COLUMN "resetPasswordToken",
DROP COLUMN "verificationCode",
DROP COLUMN "verificationCodeExpire";

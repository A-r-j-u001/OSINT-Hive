"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ShieldCheck, Lock } from "lucide-react"

export function PaymentModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold hover:from-yellow-600 hover:to-amber-700">
                    <Lock className="w-4 h-4 mr-2" /> Unlock Contact Details
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-950 border-slate-800 text-slate-50">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <ShieldCheck className="text-yellow-500" /> Premium Intel Access
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Get instant access to verified email addresses, phone numbers, and full resume downloads.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-center">
                        <div className="text-3xl font-bold text-white">$4.99</div>
                        <div className="text-xs text-yellow-200 uppercase tracking-wider">Per Search Report</div>
                    </div>
                    <ul className="text-sm text-slate-300 space-y-2">
                        <li className="flex gap-2">✓ Verified SMTP Emails</li>
                        <li className="flex gap-2">✓ 5 Deep OSINT Scans</li>
                        <li className="flex gap-2">✓ Full JSON Export</li>
                    </ul>
                </div>
                <DialogFooter>
                    <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-400 font-bold" onClick={() => alert("Redirecting to Stripe...")}>
                        Proceed to Checkout
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
